import { Routes, Route } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import Header from "./components/layout/Header";
import WhatsAppButton from "./components/layout/WhatsAppButton";
import HeroCarousel from "./components/sections/HeroCarousel";
import Nosotros from "./components/sections/Nosotros";
import Servicios from "./components/sections/Servicios";
import Tecnologia from "./components/sections/Tecnologia";
import OffsetDigital from "./components/sections/OffsetDigital";
import CarteleriaDigital from "./components/sections/CarteleriaDigital";
import Clientes from "./components/sections/Clientes";
import Trabajos from "./components/sections/Trabajos";
import Sectores from "./components/sections/Sectores";
import Faq from "./components/sections/Faq";
import Contacto from "./components/sections/Contacto";
import BrochurePage from "./pages/BrochurePage";

function LandingPage() {
  const { theme, toggle } = useTheme();
  return (
    <>
      <Header theme={theme} onToggleTheme={toggle} />
      <main>
        <HeroCarousel />
        <Nosotros />
        <Servicios />
        <Tecnologia />
        <OffsetDigital />
        <CarteleriaDigital />
        <Clientes />
        <Trabajos />
        <Sectores />
        <Faq />
        <Contacto />
      </main>
      <WhatsAppButton />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/brochure" element={<BrochurePage />} />
    </Routes>
  );
}

export default App;
