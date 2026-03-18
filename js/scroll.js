/* ===============================
   LENIS + GSAP (CLEAN SYNC)
================================ */

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.2,
  smooth: true
});


/* SINGLE RAF LOOP (ONLY THIS) */

function raf(time) {
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);


/* disable GSAP lag smoothing */

gsap.ticker.lagSmoothing(0);


/* refresh */

ScrollTrigger.refresh();