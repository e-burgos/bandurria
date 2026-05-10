import { useTheme } from "./hooks/useTheme";
import Header from "./components/layout/Header";
import WhatsAppButton from "./components/layout/WhatsAppButton";
import Nosotros from "./components/sections/Nosotros";
import Stats from "./components/sections/Stats";
import Tecnologia from "./components/sections/Tecnologia";
import Servicios from "./components/sections/Servicios";
import OffsetDigital from "./components/sections/OffsetDigital";
import Clientes from "./components/sections/Clientes";
import Contacto from "./components/sections/Contacto";

function App() {
  const { theme, toggle } = useTheme();

  return (
    <>
      <Header theme={theme} onToggleTheme={toggle} />
      <main>
        <Nosotros />
        <Stats />
        <Tecnologia />
        <Servicios />
        <OffsetDigital />
        <Clientes />
        <Contacto />
      </main>
      <WhatsAppButton />
    </>
  );
}

export default App;
