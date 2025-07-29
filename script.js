function init() {
  tsParticles.load("confetti-bg", {
    fullScreen: { enable: false },
    particles: {
      number: { value: 120 },
      color: { value: ["#FFC700", "#FF0000", "#2E3192", "#41BBC7"] },
      shape: { type: "circle" },
      opacity: { value: 0.8 },
      size: { value: 5 },
      move: {
        enable: true,
        direction: "bottom",
        speed: 2,
        outMode: "out"
      }
    }
  });
}

function mostrar(seccionId) {
  document.querySelectorAll(".pantalla").forEach(p => p.classList.remove("activa"));
  document.getElementById(seccionId).classList.add("activa");
}
