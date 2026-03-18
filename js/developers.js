gsap.registerPlugin(ScrollTrigger);

// HERO ANIMATION
gsap.from("#dev-hero h1", {
  y: 50,
  opacity: 0,
  duration: 1
});

gsap.from("#dev-hero p", {
  y: 30,
  opacity: 0,
  duration: 1,
  delay: 0.3
});

// CARDS STAGGER ANIMATION
gsap.from(".dev-card", {
  scrollTrigger: {
    trigger: ".dev-container",
    start: "top 80%"
  },
  y: 80,
  opacity: 0,
  duration: 1,
  stagger: 0.2
});

