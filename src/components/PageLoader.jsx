import BurgerLoader from "./BurgerLoader";

function PageLoader({ visible = true }) {
  return (
    <div
      className="fixed inset-0 z-[100] bg-[#E76F51] flex flex-col items-center justify-center gap-6 transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }}
      aria-hidden={!visible}
    >
      <BurgerLoader className="w-56 sm:w-72 h-auto overflow-visible" />
      <div className="text-xs uppercase tracking-[0.3em] text-[#FFFDF9]">Loading</div>
    </div>
  );
}

export default PageLoader;
