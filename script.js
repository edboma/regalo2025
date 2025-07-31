// Variables globales para el audio
let audioPermitido = false;
const audio = new Audio('assets/music.mp3');
audio.loop = true;
audio.volume = 0.3; // Volumen al 30% para mejor experiencia

// Función para manejar el audio
function toggleAudio() {
  const icon = document.querySelector('.audio-control i');
  const audioControl = document.querySelector('.audio-control');
  
  // Efecto visual al pulsar
  audioControl.classList.add('pulsando');
  setTimeout(() => audioControl.classList.remove('pulsando'), 200);
  
  if (audio.paused) {
    audioPermitido = true;
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise.then(_ => {
        icon.classList.remove('fa-music');
        icon.classList.add('fa-pause');
      }).catch(error => {
        console.error("Error al reproducir:", error);
        if (audioPermitido) {
          alert("Por favor, haz clic en el icono de música para activarlo. Algunos navegadores bloquean el audio automático.");
        }
      });
    }
  } else {
    audio.pause();
    icon.classList.remove('fa-pause');
    icon.classList.add('fa-music');
  }
}

// Función para inicializar la página
function init(){
  startCounter();
  generateCalendarLink();
  generateQr();
  actualizarBotones();
  animarPrimeraCarga();
  
  // Configurar el control de audio
  document.querySelector('.audio-control').addEventListener('click', toggleAudio);
}

// Función para los corazones de confeti
function iniciarCorazones() {
  tsParticles.load("confetti-bg", {
    fullScreen:{enable:true,zIndex:1},
    particles:{
      number:{value:80},
      shape:{type:"char", character:{value:"❤", font:"Verdana", style:"", weight:"400"}},
      color:{value:"#FF69B4"},
      opacity:{value:0.7},
      size:{value:16},
      move:{enable:true, direction:"bottom", speed:3}
    }
  });
}

// Función para comenzar la sorpresa
function empezarSorpresa() {
  const pantalla = document.getElementById("pantalla-inicial");
  pantalla.style.opacity = 0;
  setTimeout(() => {
    pantalla.style.display = "none";
    document.querySelector(".tarjeta").style.display = "block";
    iniciarCorazones();
    init();
  }, 800);
}

// Función para mostrar secciones
function mostrar(id){
  document.querySelectorAll('.pantalla').forEach(s=>s.classList.remove('activa'));
  document.getElementById(id).classList.add('activa');
  document.body.className = id;
  actualizarBotones();
}

// Contador regresivo
function startCounter(){
  const target = new Date("2025-09-18T00:00:00");
  setInterval(()=>{
    const now = new Date();
    const diff = target - now;
    
    if (diff < 0) {
      document.getElementById("contador-text").textContent = "¡Llegó el día!";
      return;
    }
    
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    
    document.getElementById("contador-text").textContent = 
      `Faltan ${d}d ${h}h ${m}m ${s}s para el viaje`;
  }, 1000);
}

// Generar link para Google Calendar
function generateCalendarLink(){
  const start = "20250918T090000Z", end = "20250921T180000Z";
  const url = "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=Viaje%20en%20pareja" +
    "&dates=" + start + "/" + end +
    "&details=Viaje%20para%20disfrutar%20en%20Cork%20Valley" +
    "&location=" + encodeURIComponent("http://corkvalley.es/");
  document.getElementById("cal-link").href = url;
}

// Generar código QR
function generateQr(){
  const pageUrl = window.location.href;
  document.getElementById("qr-img").src = 
    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + 
    encodeURIComponent(pageUrl);
}

// Actualizar botones de navegación
function actualizarBotones() {
  const nav = document.getElementById('botones-nav');
  const seccion = document.querySelector('.pantalla.activa').id;
  let botones = [];

  if (seccion === "inicio") {
    botones = [
      { id: "comidas", texto: "Comidas" },
      { id: "actividades", texto: "Actividades" }
    ];
  } else if (seccion === "comidas") {
    botones = [
      { id: "inicio", texto: "Inicio" },
      { id: "actividades", texto: "Actividades" }
    ];
  } else if (seccion === "actividades") {
    botones = [
      { id: "inicio", texto: "Inicio" },
      { id: "comidas", texto: "Comidas" }
    ];
  }

  nav.innerHTML = '';
  botones.forEach(btn => {
    const b = document.createElement("button");
    b.textContent = btn.texto;
    b.onclick = () => mostrar(btn.id);
    nav.appendChild(b);
  });
}

// Animación de carga inicial
function animarPrimeraCarga() {
  const partes = [
    "h1", "#contador-text", "#inicio h2",
    ".mapa-ubicacion", "#cal-link", ".qr"
  ];
  
  partes.forEach((selector, i) => {
    const el = document.querySelector(selector);
    if (el) {
      el.classList.add("fade-in", `fade-delay-${i + 1}`);
    }
  });
}

// Ajustar imagen inicial al cargar
function ajustarImagenInicial() {
  const fotoContainer = document.querySelector('.foto-inicial-container');
  if (fotoContainer) {
    const containerWidth = fotoContainer.offsetWidth;
    const containerHeight = fotoContainer.offsetHeight;
    const foto = document.querySelector('.foto-inicial');
    
    if (foto) {
      foto.style.maxWidth = containerWidth + 'px';
      foto.style.maxHeight = containerHeight + 'px';
    }
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Configurar el reajuste de imagen al cambiar tamaño
  window.addEventListener('resize', ajustarImagenInicial);
  
  // Ajustar imagen inicial después de un breve retraso
  setTimeout(ajustarImagenInicial, 100);
  
  // Precargar el audio
  audio.load();
});
