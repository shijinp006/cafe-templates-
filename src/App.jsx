import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { LenisProvider } from "./lib/LenisContext";
import { CartProvider } from "./lib/CartContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import About from "./components/About";
import Contact from "./components/Contact";
import MobileNav from "./components/MobileNav";
import PageLoader from "./components/PageLoader";

const PAGE_LOAD_MS = 1500;

const MenuPage = lazy(() => import("./components/MenuPage"));
const WishlistPage = lazy(() => import("./components/WishlistPage"));
const OrderPage = lazy(() => import("./components/OrderPage"));

const PAGE_FALLBACK = <PageLoader />;

function App() {
  const [pageLoading, setPageLoading] = useState(false);
  const loadTimer = useRef(null);
  const [currentView, setCurrentView] = useState(() => {
    const hash = window.location.hash;
    if (hash === "#menu") return "menu";
    if (hash === "#wishlist") return "wishlist";
    if (hash === "#order") return "order";
    return "home";
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#menu") {
        setCurrentView("menu");
      } else if (hash === "#wishlist") {
        setCurrentView("wishlist");
      } else if (hash === "#order") {
        setCurrentView("order");
      } else if (
        hash === "" ||
        hash === "#hero" ||
        hash === "#products" ||
        hash === "#about" ||
        hash === "#contact"
      ) {
        setCurrentView("home");
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateTo = (view, hash) => {
    window.location.hash = hash;
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateWithLoader = (view, hash) => {
    setPageLoading(true);
    clearTimeout(loadTimer.current);
    loadTimer.current = setTimeout(() => setPageLoading(false), PAGE_LOAD_MS);
    navigateTo(view, hash);
  };

  useEffect(() => () => clearTimeout(loadTimer.current), []);

  const navigateToMenu = () => navigateTo("menu", "menu");
  const navigateToWishlist = () => navigateWithLoader("wishlist", "wishlist");
  const navigateToOrder = () => navigateWithLoader("order", "order");
  const navigateToHome = () => navigateTo("home", "hero");

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
      <CartProvider>
        <Navbar
          onNavigateSection={handleNavigateSection}
          onNavigateWishlist={navigateToWishlist}
          onNavigateOrder={navigateToOrder}
        />
        <MobileNav
          onNavigateSection={handleNavigateSection}
          onNavigateWishlist={navigateToWishlist}
          onNavigateOrder={navigateToOrder}
        />
        {pageLoading && <PageLoader />}
        {currentView === "menu" ? (
          <Suspense fallback={<div className="min-h-screen bg-[#FFFDF9]" />}>
            <MenuPage onBack={navigateToHome} />
          </Suspense>
        ) : currentView === "wishlist" ? (
          <Suspense fallback={PAGE_FALLBACK}>
            <WishlistPage onBack={navigateToHome} onNavigateMenu={navigateToMenu} />
          </Suspense>
        ) : currentView === "order" ? (
          <Suspense fallback={PAGE_FALLBACK}>
            <OrderPage onBack={navigateToHome} onNavigateMenu={navigateToMenu} />
          </Suspense>
        ) : (
          <>
            <Hero />
            <Products onViewFullMenu={navigateToMenu} />
            <About />
            <Contact />
          </>
        )}
      </CartProvider>
    </LenisProvider>
  );
}

export default App;
