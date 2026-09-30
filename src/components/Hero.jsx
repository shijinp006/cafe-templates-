import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    const scaleFactor = isMobile ? 1.4 : BURGER_SCALE;
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
        if (loadedCount === 1) drawFrame(0);
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

    return () => ctxGsap.revert();
  }, [loaded]);

  return (
    <section id="hero" className="relative">
      {!loaded && (
        <div
          className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center gap-4 transition-opacity duration-500"
          style={{ opacity: loaded ? 0 : 1, pointerEvents: loaded ? "none" : "auto" }}
        >
          <div className="brand-font text-xl tracking-widest text-amber-500">EMBER</div>
          <div className="w-[220px] h-[2px] bg-neutral-800">
            <div
              className="h-full bg-gradient-to-r from-amber-600 to-amber-200"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="text-xs uppercase tracking-widest text-gray-500">
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
            className="absolute z-20 left-4 right-4 top-[58%] sm:left-6 sm:right-auto lg:left-20 sm:top-1/2 sm:-translate-y-1/2 max-w-none sm:max-w-md"
          >
            <p className="text-amber-500 text-xs uppercase tracking-[0.3em] mb-4">
              Ember Signature
            </p>
            <h1 className="brand-font text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Crafted In
              <br />
              Layers
            </h1>
            <p className="text-gray-400 text-base md:text-lg max-w-sm mb-10">
              Watch our signature burger come apart, ingredient by
              ingredient — each one flame-grilled and stacked with
              intention.
            </p>
            <div className="hidden sm:flex items-center gap-2 text-gray-500 text-xs uppercase tracking-widest">
              <span>Scroll to explore</span>
              <span className="inline-block animate-bounce">↓</span>
            </div>
          </div>

          <div className="absolute top-0 left-0 right-0 h-[55%] w-full sm:inset-y-0 sm:left-auto sm:right-0 sm:h-full sm:w-[85%] lg:w-[82%] z-0 pointer-events-none flex items-center justify-center">
            <div className="w-[65%] h-[65%] rounded-full bg-gradient-to-br from-amber-500/30 via-amber-600/20 to-transparent blur-[90px]" />
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
