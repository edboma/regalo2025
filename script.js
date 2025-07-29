function init() {
  tsParticles.load("confetti-bg", {
    fullScreen: { enable: true, zIndex: 1 },
    particles: {
      number: { value: 80 },
      shape: { type: "circle" },
      color: { value: ["#FFC700", "#FF0000", "#2E3192", "#41BBC7"] },
      opacity: { value: 0.9 },
      size: { value: 5 },
      move: {
        enable: true,
        direction: "bottom",
        speed: 4
      }
    }
  });

  startCounter();
  generateCalendarLink();
  generateQr();
}

function mostrar(id) {
  document.querySelectorAll('.pantalla').forEach(s => s.classList.remove('activa'));
  document.getElementById(id).classList.add('activa');
}

function toggleAudio() {
  const a = document.getElementById('audio');
  a.paused ? a.play() : a.pause();
}

function startCounter() {
  const target = new Date("2025-09-18T00:00:00");
  setInterval(() => {
    const now = new Date(), diff = target - now;
    if (diff < 0) {
      document.getElementById("contador-text").textContent = "¡Llegó el día!";
      return;
    }
    const d = Math.floor(diff / 86400000),
          h = Math.floor((diff % 86400000) / 3600000),
          m = Math.floor((diff % 3600000) / 60000),
          s = Math.floor((diff % 60000) / 1000);

    document.getElementById("contador-text").textContent =
      `Faltan ${d}d ${h}h ${m}m ${s}s para nuestro viaje`;
  }, 1000);
}

function generateCalendarLink() {
  const start = "20250918T090000Z";
  const end = "20250921T180000Z";
  const url = "https://calendar.google.com/calendar/render?action=TEMPLATE"
    + "&text=Viaje%20con%20Cris"
    + "&dates=" + start + "/" + end
    + "&details=Viaje%20para%20disfrutar%20en%20Cork%20Valley"
    + "&location=" + encodeURIComponent("http://corkvalley.es/");
  document.getElementById("cal-link").href = url;
}

function generateQr() {
  const pageUrl = window.location.href;
  document.getElementById("qr-img").src =
    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(pageUrl);
}
