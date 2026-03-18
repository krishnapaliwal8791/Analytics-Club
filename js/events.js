gsap.registerPlugin(ScrollTrigger);

/* ===============================
   ROUND 1 TIMELINE
================================ */

let tl = gsap.timeline({
  scrollTrigger:{
    trigger: ".round1",
    start: "top top",
    end: "+=250%",
    scrub: 1,
    pin: true
  }
});

/* ===============================
   ROUND 2 TIMELINE
================================ */

let tl2 = gsap.timeline({
  scrollTrigger:{
    trigger: ".round2",
    start: "top top",
    end: "+=220%",
    scrub: 1,
    pin: true
  }
});

let tl3 = gsap.timeline({
  scrollTrigger:{
    trigger: ".round3",
    start: "top top",
    end: "+=220%",
    scrub: 1,
    pin: true
  }
});

/* ===============================
   INITIAL STATE
================================ */

gsap.set(".slot", { opacity: 0, scale: 0.8 });

gsap.set(".control-text", { opacity: 0, y: 20 });

gsap.set(".result-text", { opacity: 0, y: 20 });

gsap.set(".phase-guess", { opacity: 0, y: 40 });

gsap.set(".phase-decision", { opacity: 0, y: 40 });

gsap.set(".phase-result", { opacity: 0, y: 40 });

gsap.set(".phase-graph", { opacity: 0, y: 40 });
gsap.set(".phase-bid", { opacity: 0, y: 40 });
gsap.set(".phase-final", { opacity: 0, y: 40 });

gsap.set(".choice", { opacity: 0 });

/* ===============================
   ROUND 2 — GUESSTIMATION
================================ */

tl2.to(".phase-guess", {
  opacity: 1,
  y: 0
});

/* Number changes (no TextPlugin → manual) */

tl2.to(".guess-value", { innerHTML: "3M" });
tl2.to(".guess-value", { innerHTML: "50M" });
tl2.to(".guess-value", { innerHTML: "500M" });
tl2.to(".guess-value", { innerHTML: "8 Billion+" });

/* Hide guess */

tl2.to(".phase-guess", {
  opacity: 0,
  y: -30
});

/* ===============================
   ROUND 2 — DECISION PHASE
================================ */

tl2.to(".phase-decision", {
  opacity: 1,
  y: 0
});

/* Tension delay */

tl2.to({}, { duration: 0.3 });

/* SET TEXT (INSTANT — no animation bug) */

tl2.set(".player-a .choice", { innerHTML: "Split" });
tl2.set(".player-b .choice", { innerHTML: "Steal" });

/* Reveal with opacity (smooth) */

tl2.to(".player-a .choice", {
  opacity: 1,
  duration: 0.4
});

tl2.to({}, { duration: 0.2 });

/* TEAM B DECISION */

tl2.to(".player-b .choice", {
  opacity: 1,
  duration: 0.4
});

/* PAUSE BEFORE SIMULATION */

tl2.to({}, { duration: 0.4 });

/* ===============================
   SIMULATION (VISIBLE + CLEAR)
================================ */

/* RESET FUNCTION */
function resetPlayers() {
  gsap.set(".player", {
    scale: 1,
    opacity: 1,
    boxShadow: "none"
  });

  gsap.set(".credits", {
    color: "#aaa"
  });
}

/* Case 1: Split / Split */

tl2.call(resetPlayers);

tl2.set(".player-a .choice", { innerHTML: "Split" });
tl2.set(".player-b .choice", { innerHTML: "Split" });

tl2.set(".player-a .credits", { innerHTML: "+300" });
tl2.set(".player-b .credits", { innerHTML: "+300" });

tl2.to(".player", {
  scale: 1.05,
  duration: 0.2
});

tl2.to({}, { duration: 0.6 });

/* Case 2: Split / Steal */

tl2.call(resetPlayers);

tl2.set(".player-a .choice", { innerHTML: "Split" });
tl2.set(".player-b .choice", { innerHTML: "Steal" });

tl2.set(".player-a .credits", { innerHTML: "+0" });
tl2.set(".player-b .credits", { innerHTML: "+600" });

tl2.to(".player-b", {
  scale: 1.1,
  boxShadow: "0 0 20px #ff3b3b",
  duration: 0.2
});

tl2.to({}, { duration: 0.6 });

/* Case 3: Steal / Split */

tl2.call(resetPlayers);

tl2.set(".player-a .choice", { innerHTML: "Steal" });
tl2.set(".player-b .choice", { innerHTML: "Split" });

tl2.set(".player-a .credits", { innerHTML: "+600" });
tl2.set(".player-b .credits", { innerHTML: "+0" });

tl2.to(".player-a", {
  scale: 1.1,
  boxShadow: "0 0 20px #ff3b3b",
  duration: 0.2
});

tl2.to({}, { duration: 0.6 });

/* Case 4: Steal / Steal */

tl2.call(resetPlayers);

tl2.set(".player-a .choice", { innerHTML: "Steal" });
tl2.set(".player-b .choice", { innerHTML: "Steal" });

tl2.set(".player-a .credits", { innerHTML: "-100" });
tl2.set(".player-b .credits", { innerHTML: "-100" });


tl2.to(".player", {
  opacity: 0.6,
  duration: 0.2
});

tl2.to({}, { duration: 0.6 });

/* ===============================
   FAKE OUTCOME
================================ */

tl2.call(resetPlayers);

tl2.set(".player-a .choice", { innerHTML: "Steal" });
tl2.set(".player-b .choice", { innerHTML: "Steal" });

tl2.set(".player-a .credits", { innerHTML: "-100" });
tl2.set(".player-b .credits", { innerHTML: "-100" });

tl2.to(".player", {
  opacity: 0.6,
  scale: 0.95,
  duration: 0.3
});

/* PAUSE */

tl2.to({}, { duration: 0.8 });

/* ===============================
   REAL OUTCOME
================================ */

tl2.call(resetPlayers);

tl2.set(".player-a .choice", { innerHTML: "Split" });
tl2.set(".player-b .choice", { innerHTML: "Steal" });

tl2.set(".player-a .credits", { innerHTML: "+0" });
tl2.set(".player-b .credits", { innerHTML: "+600" });

tl2.to(".player-b", {
  scale: 1.1,
  boxShadow: "0 0 30px #ff3b3b",
  duration: 0.6
});

tl2.to(".player-a", {
  opacity: 0.5
}, "<");

tl2.to(".player-b .credits", {
  color: "#ff3b3b",
  duration: 0.3
});

/* ===============================
   ROUND 3 — FLOW
================================ */

/* GRAPH APPEARS */

tl3.to(".phase-graph", {
  opacity: 1,
  y: 0
});

/* DRAW GRAPH */

tl3.to(".graph-progress", {
  scaleX: 0.7,
  duration: 0.8,
  ease: "power2.out"
});

tl3.to(".graph-progress", {
  scaleX: 1,
  duration: 0.4,
  ease: "power4.in"
});

tl3.to(".graph-end", {
  innerHTML: "Going Up...",
  color: "#00D4FF",
  duration: 0.4
});

tl3.to({}, { duration: 0.5 });

tl3.to(".graph-end", {
  innerHTML: "CRASH ↓",
  color: "#ff3b3b",
  scale: 1.2,
  duration: 0.3
});

tl3.to(".graph-end", {
  scale: 1,
  duration: 0.2
});

tl3.to(".graph-line", {
  x: -6,
  repeat: 8,
  yoyo: true,
  duration: 0.035
});

/* STOP POINT */

tl3.to(".graph-end", {
  innerHTML: "What now?",
  color: "#aaa",
  duration: 0.4
});

/* PAUSE */

tl3.to({}, { duration: 0.5 });

/* HIDE GRAPH */

tl3.to(".phase-graph", {
  opacity: 0,
  scale: 0.95,
  duration: 0.4
});

/* SHOW BIDDING */

tl3.fromTo(".phase-bid",
  { opacity: 0, y: 80 },
  { opacity: 1, y: 0, duration: 0.6 }
);

tl3.from(".bid", {
  scale: 0.8,
  opacity: 0,
  stagger: 0.2,
  duration: 0.4
}, "-=0.3");

/* BIDDING INCREASE */

tl3.fromTo(".player-a .bid-value",
  { innerHTML: "0" },
  { innerHTML: "300", duration: 0.6 }
);

tl3.fromTo(".player-b .bid-value",
  { innerHTML: "0" },
  { innerHTML: "600", duration: 0.6 }
);

tl3.to(".player-b", {
  scale: 1.1,
  boxShadow: "0 0 25px #00D4FF",
  duration: 0.4
});

/* PAUSE */

tl3.to({}, { duration: 0.5 });

/* HIDE BIDDING */

tl3.to(".phase-bid", {
  opacity: 0
});

/* FINAL RESULT */

/* FLASH */

tl3.to(".flash", {
  opacity: 1,
  duration: 0.1
});

tl3.to(".flash", {
  opacity: 0,
  duration: 0.3
});

/* FINAL RESULT */

tl3.to(".phase-final", {
  opacity: 1,
  y: 0,
  scale: 1.1,
  duration: 0.4
});

tl3.to(".phase-final", {
  scale: 1,
  duration: 0.2
});

/* FINAL GLOW */

tl3.to(".phase-final", {
  boxShadow: "0 0 40px rgba(0,212,255,0.4)",
  duration: 0.5
});

tl3.to(".round-visual", {
  scale: 1.03,
  duration: 1,
  ease: "power1.out"
});


/* ===============================
   ROUND 1 — ANIMATION
================================ */

tl.to(".control-text", {
  opacity:1,
  y:0,
  duration:0.6
});

tl.to(".wheel", {
  rotate: 360,
  ease: "none",
  duration: 4
}, 0);

tl.to(".slot", {
  opacity: 1,
  scale: 1,
  stagger: 0.2
});

/* Target selection */

tl.to(".slot", {
  opacity: 0.2,
  scale: 0.9
});

tl.to(".slot1, .slot3, .slot5", {
  opacity: 1,
  scale: 1.1
});

/* Flicker */

tl.to(".slot", {
  scale: 1.1,
  stagger: {
    each: 0.05,
    repeat: 3,
    yoyo: true
  }
}, "-=1");

/* Probability */

tl.to(".slot2, .slot5", {
  backgroundColor: "#00D4FF",
  boxShadow: "0 0 25px #00D4FF",
  scale: 1.2,
  duration: 0.6
});

/* Pause */

tl.to({}, { duration: 0.3 });

/* Hit */

tl.to(".slot2, .slot5", {
  scale: 1.4,
  backgroundColor: "#ff3b3b",
  boxShadow: "0 0 35px #ff3b3b",
  duration: 0.4
});

tl.to(".slot2, .slot5", {
  x: -4,
  repeat: 5,
  yoyo: true,
  duration: 0.05
});

tl.to(".wheel", {
  scale: 1.05,
  duration: 0.2,
  yoyo: true,
  repeat: 1
}, "<");

/* Pause */

tl.to({}, { duration: 0.3 });

/* Result */

tl.to(".result-text", {
  opacity: 1,
  y: -10,
  scale: 1.1,
  duration: 0.5
});

tl.to(".result-text", {
  scale: 1,
  duration: 0.3
});