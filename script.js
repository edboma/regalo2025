
let confettiInstance;
let interval;

function initConfetti() {
  const canvas = document.getElementById('canvas-fondo');
  confettiInstance = confetti.create(canvas, { resize: true });
}

function lanzarConfeti(tipo) {
  clearInterval(interval);

  if (tipo === 'inicio') {
    interval = setInterval(() => {
      confettiInstance({
        particleCount: 2,
        spread: 80,
        origin: { x: Math.random(), y: Math.random() * 0.6 }
      });
    }, 300);
  }

  if (tipo === 'comidas') {
    interval = setInterval(() => {
      confettiInstance({
        particleCount: 3,
        angle: 90,
        spread: 30,
        shapes: ['square'],
        colors: ['#f4a261', '#e76f51'],
        scalar: 1.2,
        origin: { x: Math.random(), y: 0 }
      });
    }, 200);
  }

  if (tipo === 'actividades') {
    interval = setInterval(() => {
      confettiInstance({
        particleCount: 3,
        angle: 90,
        spread: 60,
        shapes: ['circle'],
        colors: ['#2a9d8f', '#264653'],
        scalar: 1.5,
        origin: { x: Math.random(), y: 0 }
      });
    }, 250);
  }
}

function mostrar(id) {
  document.querySelectorAll('.pantalla').forEach(sec => sec.classList.remove('activa'));
  document.getElementById(id).classList.add('activa');
  lanzarConfeti(id);
}
