
let currentEffect;

function initConfetti() {
  lanzarConfeti("inicio");
}

function mostrar(id) {
  document.querySelectorAll(".pantalla").forEach(sec => sec.classList.remove("activa"));
  document.getElementById(id).classList.add("activa");
  lanzarConfeti(id);
}

function lanzarConfeti(tipo) {
  if (currentEffect) clearInterval(currentEffect);
  const duration = Infinity;
  const end = Date.now() + duration;
  const canvas = document.getElementById("confetti-canvas");
  const confettiInstance = confetti.create(canvas, { resize: true, useWorker: true });

  function effectInicio() {
    confettiInstance({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ["#bb0000", "#ffffff", "#00bb00", "#0000bb"]
    });
    confettiInstance({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ["#bb0000", "#ffffff", "#00bb00", "#0000bb"]
    });
  }

  function effectComida() {
    confettiInstance({
      particleCount: 3,
      spread: 70,
      scalar: 1.2,
      shapes: ["image"],
      origin: { y: 0 },
      ticks: 200,
      gravity: 0.5,
      image: { src: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png", width: 32, height: 32 }
    });
  }

  function effectActividades() {
    confettiInstance({
      particleCount: 3,
      spread: 70,
      scalar: 1.5,
      shapes: ["image"],
      origin: { y: 0 },
      ticks: 200,
      gravity: 0.4,
      image: { src: "https://cdn-icons-png.flaticon.com/512/201/201623.png", width: 32, height: 32 }
    });
  }

  currentEffect = setInterval(() => {
    if (tipo === "inicio") effectInicio();
    else if (tipo === "comidas") effectComida();
    else if (tipo === "actividades") effectActividades();
  }, 500);
}
