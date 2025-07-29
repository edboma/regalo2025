function iniciarConfeti() {
  tsParticles.load("confetti-canvas", {
    fullScreen: { enable: true, zIndex: -1 },
    particles: {
      number: { value: 200 },
      color: { value: ["#fce18a", "#ff726d", "#b48def", "#f4306d"] },
      shape: { type: ["circle", "square"] },
      opacity: {
        value: 1,
        random: true,
        anim: { enable: true, speed: 0.5, opacity_min: 0.1, sync: false },
      },
      size: {
        value: 8,
        random: true,
        anim: { enable: true, speed: 2, size_min: 0.5, sync: false },
      },
      move: {
        enable: true,
        speed: 2,
        direction: "bottom",
        outModes: { default: "out" },
      }
    },
    detectRetina: true
  });
}
