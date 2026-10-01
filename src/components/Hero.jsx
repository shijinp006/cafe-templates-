import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BurgerLoader from "./BurgerLoader";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 240;
const frameUrl = (i) => `/frames-cutout/frame_${String(i).padStart(4, "0")}.webp`;
const BURGER_SCALE = 1.0;
// This source video is a clean 1280px-wide shot with no baked-in labels
// and generous margin around the subject, so no crop is needed.
const CROP_X = 0;
const CROP_W = 1280;
const EDGE_FADE = 0.03;

function Hero() {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const stickyRef = useRef(null);
  const heroTextRef = useRef(null);
  const imagesRef = useRef([]);
  const lastDrawnIndex = useRef(0);

  const [percent, setPercent] = useState(0);
  const [loaded, setLoaded] = useState(false);

  function drawFrame(index) {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    lastDrawnIndex.current = index;

    const ctx = canvas.getContext("2d");
    const canvasW = canvas.width;
    const canvasH = canvas.height;
    const cropW = Math.min(CROP_W, img.naturalWidth);
    const cropH = img.naturalHeight;
    const imgRatio = cropW / cropH;
    const canvasRatio = canvasW / canvasH;

    let baseW, baseH;
    if (imgRatio > canvasRatio) {
      baseW = canvasW;
      baseH = baseW / imgRatio;
    } else {
      baseH = canvasH;
      baseW = baseH * imgRatio;
    }

    const isMobile = window.innerWidth < 640;
    const scaleFactor = isMobile ? 1.2 : BURGER_SCALE;
    const drawW = baseW * scaleFactor;
    const drawH = baseH * scaleFactor;
    const offsetX = (canvasW - drawW) / 2;
    const offsetY = (canvasH - drawH) / 2;

    ctx.clearRect(0, 0, canvasW, canvasH);
    ctx.drawImage(img, CROP_X, 0, cropW, cropH, offsetX, offsetY, drawW, drawH);

    // Eased ramp: stay near-transparent through most of the fade zone, then
    // snap to opaque right at the boundary, so thin residual lines never
    // reach a visible alpha the way a straight linear ramp would.
    const fade = ctx.createLinearGradient(offsetX, 0, offsetX + drawW, 0);
    fade.addColorStop(0, "rgba(0,0,0,0)");
    fade.addColorStop(EDGE_FADE * 0.85, "rgba(0,0,0,0.01)");
    fade.addColorStop(EDGE_FADE, "rgba(0,0,0,1)");
    fade.addColorStop(1 - EDGE_FADE, "rgba(0,0,0,1)");
    fade.addColorStop(1 - EDGE_FADE * 0.85, "rgba(0,0,0,0.01)");
    fade.addColorStop(1, "rgba(0,0,0,0)");
    ctx.globalCompositeOperation = "destination-in";
    ctx.fillStyle = fade;
    ctx.fillRect(offsetX, offsetY, drawW, drawH);
    ctx.globalCompositeOperation = "source-over";
  }

  useEffect(() => {
    const canvas = canvasRef.current;

    function resizeCanvas() {
      canvas.width = canvas.clientWidth * window.devicePixelRatio;
      canvas.height = canvas.clientHeight * window.devicePixelRatio;
    }

    resizeCanvas();

    // Always start the intro from the top, on the assembled burger frame.
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const handleResize = () => {
      resizeCanvas();
      drawFrame(lastDrawnIndex.current);
    };
    window.addEventListener("resize", handleResize);

    let cancelled = false;
    let loadedCount = 0;
    const images = new Array(FRAME_COUNT);
    imagesRef.current = images;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const onOne = () => {
        loadedCount++;
        if (cancelled) return;
        const pct = Math.round((loadedCount / FRAME_COUNT) * 100);
        setPercent(pct);
        if (i === 0) drawFrame(0);
        if (loadedCount === FRAME_COUNT) setLoaded(true);
      };
      img.onload = onOne;
      img.onerror = onOne;
      img.src = frameUrl(i + 1);
      images[i] = img;
    }

    return () => {
      cancelled = true;
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const ctxGsap = gsap.context(() => {
      const scrub = { frame: 0 };
      drawFrame(0);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: stickyRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          anticipatePin: 1,
        },
        defaults: { ease: "none" },
      });

      tl.to(
        scrub,
        {
          frame: FRAME_COUNT - 1,
          duration: 10,
          onUpdate: () => drawFrame(Math.round(scrub.frame)),
        },
        0
      );
    });

    ScrollTrigger.refresh();

    return () => ctxGsap.revert();
  }, [loaded]);

  return (
    <section id="hero" className="relative">
      {!loaded && (
        <div
          className="fixed inset-0 z-[100] bg-[#E76F51] flex flex-col items-center justify-center gap-6 transition-opacity duration-500"
          style={{ opacity: loaded ? 0 : 1, pointerEvents: loaded ? "none" : "auto" }}
        >
          <BurgerLoader className="w-56 sm:w-72 h-auto overflow-visible" />
          <div className="text-xs uppercase tracking-[0.3em] text-[#FFFDF9]">
            Loading {percent}%
          </div>
        </div>
      )}

      <div ref={wrapperRef} className="relative w-full h-[400vh]">
        <div
          ref={stickyRef}
          className="relative h-screen w-full overflow-hidden bg-black"
        >
          <div
            ref={heroTextRef}
            className="absolute z-20 left-5 right-5 top-[52%] xs:top-[56%] sm:left-6 sm:right-auto lg:left-20 sm:top-1/2 sm:-translate-y-1/2 max-w-none sm:max-w-md"
          >
            <h1 className="brand-font text-4xl xs:text-5xl sm:text-7xl md:text-8xl font-bold text-[#FFFDF9] leading-[1.1] mb-3 sm:mb-6 whitespace-nowrap">
              Crafted In
              <br />
              Layers
            </h1>
            <p className="text-[#FFFDF9]/70 text-sm sm:text-base md:text-lg max-w-sm mb-6 sm:mb-10 leading-relaxed">
              Watch our signature burger come apart, ingredient by
              ingredient — each one flame-grilled and stacked with
              intention.
            </p>
            <div className="flex items-center gap-2 text-[#FFFDF9]/60 text-[11px] sm:text-xs uppercase tracking-widest font-medium">
              <span>Scroll to explore</span>
              <span className="inline-block animate-bounce">↓</span>
            </div>
          </div>

          <div className="absolute top-0 left-0 right-0 h-[55%] w-full sm:inset-y-0 sm:left-auto sm:right-0 sm:h-full sm:w-[85%] lg:w-[82%] z-0 pointer-events-none flex items-center justify-center">
            <div className="w-[65%] h-[65%] rounded-full bg-gradient-to-br from-[#F4A261]/30 via-[#E76F51]/20 to-transparent blur-[90px]" />
          </div>

          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 right-0 h-[55%] w-full sm:inset-y-0 sm:left-auto sm:right-0 sm:h-full sm:w-[85%] lg:w-[82%] block z-10"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
