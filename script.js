function mostrar(id) {
  document.querySelectorAll('.pantalla').forEach(p => p.classList.remove('activa'));
  document.getElementById(id).classList.add('activa');
}

function init() {
  tsParticles.load("confetti-bg", {
    fullScreen: { enable: true, zIndex: 1 },
    particles: {
      number: { value: 80 },
      shape: { type: "circle" },
      color: { value: ["#FFC700", "#FF0000", "#2E3192", "#41BBC7"] },
      opacity: { value: 0.9 },
      size: { value: 5 },
      move: { enable: true, direction: "bottom", speed: 4 }
    }
  });
}
