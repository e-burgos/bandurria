<?php
declare(strict_types=1);

const DESTINATION_ADDRESS = 'contacto@bandurriadeco.com.ar';
const SENDER_ADDRESS = 'contacto@bandurriadeco.com.ar';
const ALLOWED_HOSTS = ['bandurriadeco.com.ar', 'www.bandurriadeco.com.ar'];
const MAX_SUBMISSIONS_PER_HOUR = 5;

function respond(int $status, array $body): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

function originIsAllowed(): bool
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin === '') {
        return true;
    }
    return in_array(parse_url($origin, PHP_URL_HOST), ALLOWED_HOSTS, true);
}

function clientAddress(): string
{
    return $_SERVER['REMOTE_ADDR'] ?? 'unknown';
}

function submissionLimitReached(): bool
{
    $file = sys_get_temp_dir() . '/bandurria_contact_' . md5(clientAddress());
    $cutoff = time() - 3600;
    $recent = [];
    if (is_file($file)) {
        $recent = array_filter(
            array_map('intval', file($file, FILE_IGNORE_NEW_LINES) ?: []),
            static fn (int $timestamp): bool => $timestamp > $cutoff
        );
    }
    if (count($recent) >= MAX_SUBMISSIONS_PER_HOUR) {
        return true;
    }
    $recent[] = time();
    file_put_contents($file, implode("\n", $recent), LOCK_EX);
    return false;
}

function cleanLine(mixed $value): string
{
    return trim(preg_replace('/[\r\n\t]+/', ' ', (string) $value) ?? '');
}

function cleanMessage(mixed $value): string
{
    return trim(str_replace("\r\n", "\n", (string) $value));
}

function lengthBetween(string $value, int $min, int $max): bool
{
    $length = mb_strlen($value);
    return $length >= $min && $length <= $max;
}

function encodedHeader(string $value): string
{
    return mb_encode_mimeheader($value, 'UTF-8', 'B', "\r\n");
}

function sendContactEmail(string $name, string $email, string $subject, string $message): bool
{
    $body = "Nombre: {$name}\nEmail: {$email}\nAsunto: {$subject}\n\n{$message}\n\n--\nEnviado desde el formulario de contacto de la web.";
    $headers = [
        'From' => encodedHeader('Web Bandurria') . ' <' . SENDER_ADDRESS . '>',
        'Reply-To' => encodedHeader($name) . ' <' . $email . '>',
        'MIME-Version' => '1.0',
        'Content-Type' => 'text/plain; charset=UTF-8',
        'X-Mailer' => 'bandurria-contact-form',
    ];
    return mail(
        DESTINATION_ADDRESS,
        encodedHeader('[Web] ' . $subject),
        $body,
        $headers,
        '-f' . SENDER_ADDRESS
    );
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'method_not_allowed']);
}

if (!originIsAllowed()) {
    respond(403, ['ok' => false, 'error' => 'forbidden']);
}

$payload = json_decode(file_get_contents('php://input') ?: '', true);
if (!is_array($payload)) {
    respond(400, ['ok' => false, 'error' => 'invalid_request']);
}

if (cleanLine($payload['website'] ?? '') !== '') {
    respond(200, ['ok' => true]);
}

$name = cleanLine($payload['nombre'] ?? '');
$email = cleanLine($payload['mail'] ?? '');
$subject = cleanLine($payload['asunto'] ?? '');
$message = cleanMessage($payload['mensaje'] ?? '');

$isValid = lengthBetween($name, 2, 100)
    && filter_var($email, FILTER_VALIDATE_EMAIL) !== false
    && lengthBetween($email, 5, 150)
    && lengthBetween($subject, 3, 150)
    && lengthBetween($message, 10, 3000);

if (!$isValid) {
    respond(422, ['ok' => false, 'error' => 'invalid_fields']);
}

if (submissionLimitReached()) {
    respond(429, ['ok' => false, 'error' => 'too_many_requests']);
}

if (!sendContactEmail($name, $email, $subject, $message)) {
    respond(500, ['ok' => false, 'error' => 'send_failed']);
}

respond(200, ['ok' => true]);
