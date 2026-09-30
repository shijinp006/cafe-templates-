import { useState, useEffect } from "react";
import { LenisProvider } from "./lib/LenisContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import About from "./components/About";
import Contact from "./components/Contact";
import MenuPage from "./components/MenuPage";

function App() {
  const [currentView, setCurrentView] = useState(() =>
    window.location.hash === "#menu" ? "menu" : "home"
  );

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#menu") {
        setCurrentView("menu");
      } else if (
        window.location.hash === "" ||
        window.location.hash === "#hero" ||
        window.location.hash === "#products" ||
        window.location.hash === "#about" ||
        window.location.hash === "#contact"
      ) {
        setCurrentView("home");
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateToMenu = () => {
    window.location.hash = "menu";
    setCurrentView("menu");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToHome = () => {
    window.location.hash = "hero";
    setCurrentView("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigateSection = (id, lenis) => {
    window.location.hash = id;

    const scrollToSection = () => {
      if (id === "hero") {
        if (lenis?.scrollTo) {
          lenis.scrollTo(0, { offset: 0 });
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const target = document.getElementById(id);
      if (!target) return;

      const topPos = target.offsetTop;

      if (lenis?.scrollTo) {
        lenis.scrollTo(topPos, { offset: 0 });
      }
      window.scrollTo({
        top: topPos,
        behavior: "smooth",
      });
    };

    if (currentView !== "home") {
      setCurrentView("home");
      setTimeout(scrollToSection, 100);
      setTimeout(scrollToSection, 350);
    } else {
      scrollToSection();
    }
  };

  return (
    <LenisProvider>
      <Navbar onNavigateSection={handleNavigateSection} />
      {currentView === "menu" ? (
        <MenuPage onBack={navigateToHome} />
      ) : (
        <>
          <Hero />
          <Products onViewFullMenu={navigateToMenu} />
          <About />
          <Contact />
        </>
      )}
    </LenisProvider>
  );
}

export default App;
