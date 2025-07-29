
function mostrar(id) {
  document.querySelectorAll('.pantalla').forEach(s => s.classList.remove('activa'));
  document.getElementById(id).classList.add('activa');
  actualizarFondo(id);
}

function iniciarConfeti() {
  lanzarConfetiColorido();
}

function lanzarConfetiColorido() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const emojis = ["🎊", "🎉", "✨", "💖"];
  const particles = Array.from({ length: 100 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    emoji: emojis[Math.floor(Math.random() * emojis.length)],
    speed: Math.random() * 2 + 1,
    size: Math.random() * 24 + 16
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
      ctx.font = p.size + "px serif";
      ctx.fillText(p.emoji, p.x, p.y);
      p.y += p.speed;
      if (p.y > canvas.height) {
        p.y = -30;
        p.x = Math.random() * canvas.width;
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

function actualizarFondo(seccion) {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  const emojiMap = {
    inicio: ["🎊", "🎉", "✨", "💖"],
    comidas: ["🍔", "🌭", "🥦"],
    actividades: ["🚲", "⚽", "🛼"]
  };

  const emojis = emojiMap[seccion] || ["🎉"];
  const particles = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    emoji: emojis[Math.floor(Math.random() * emojis.length)],
    speed: Math.random() * 2 + 1,
    size: Math.random() * 28 + 16
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
      ctx.font = p.size + "px serif";
      ctx.fillText(p.emoji, p.x, p.y);
      p.y += p.speed;
      if (p.y > canvas.height) {
        p.y = -30;
        p.x = Math.random() * canvas.width;
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}
