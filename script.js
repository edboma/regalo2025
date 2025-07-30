function mostrar(id) {
  const secciones = document.querySelectorAll(".pantalla");
  secciones.forEach(sec => sec.classList.remove("activa"));
  document.getElementById(id).classList.add("activa");
}

function init() {
  const canvas = document.createElement('canvas');
  canvas.id = "confetti-canvas";
  document.getElementById("confetti-bg").appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let pieces = [];
  const numberOfPieces = 100;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  for (let i = 0; i < numberOfPieces; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 6 + 4,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      speed: Math.random() * 3 + 1
    });
  }

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.y += p.speed;
      if (p.y > canvas.height) {
        p.y = 0;
        p.x = Math.random() * canvas.width;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
    requestAnimationFrame(update);
  }
