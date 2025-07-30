function init(){
  tsParticles.load("confetti-bg", {
    fullScreen:{enable:true,zIndex:1}, particles:{ number:{value:80}, shape:{type:"circle"}, color:{value:["#FFC700","#FF0000","#2E3192","#41BBC7"]}, opacity:{value:0.9}, size:{value:5}, move:{enable:true,direction:"bottom",speed:4}}
  });
  startCounter();
  generateCalendarLink();
  generateQr();
}

function mostrar(id){
  document.querySelectorAll('.pantalla').forEach(s=>s.classList.remove('activa'));
  document.getElementById(id).classList.add('activa');
  document.body.className = id;
}

function toggleAudio(){
  const a=document.getElementById('audio');
  a.paused? a.play(): a.pause();
}

function startCounter(){
  const target = new Date("2025-09-18T00:00:00");
  setInterval(()=>{
    const now=new Date(), diff=target-now;
    if(diff<0) return document.getElementById("contador-text").textContent="¡Llegó el día!";
    const d=Math.floor(diff/86400000), h=Math.floor(diff%86400000/3600000),
          m=Math.floor(diff%3600000/60000), s=Math.floor(diff%60000/1000);
    document.getElementById("contador-text").textContent=`Faltan ${d}d ${h}h ${m}m ${s}s para el viaje`;
  },1000);
}

function generateCalendarLink(){
  const start="20250918T090000Z", end="20250921T180000Z";
  const url="https://calendar.google.com/calendar/render?action=TEMPLATE"
    +"&text=Viaje%20en%20pareja"
    +"&dates="+start+"/"+end
    +"&details=Viaje%20para%20disfrutar%20en%20Cork%20Valley"
    +"&location="+encodeURIComponent("http://corkvalley.es/");
  document.getElementById("cal-link").href=url;
}

function generateQr(){
  const pageUrl=window.location.href;
  document.getElementById("qr-img").src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="+encodeURIComponent(pageUrl);
}

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

// Llama a actualizar los botones cada vez que cambias de sección
const oldMostrar = mostrar;
mostrar = function(id) {
  document.querySelectorAll('.pantalla').forEach(s => s.classList.remove('activa'));
  document.getElementById(id).classList.add('activa');
  document.body.className = id;
  actualizarBotones();
};

// También llama a actualizarBotones al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  actualizarBotones();
});

function animarPrimeraCarga() {
  const partes = [
    "h1",                // ¡Feliz Cumpleaños, Cris!
    "#contador-text",    // contador
    "#inicio h2",        // 🧳 Viaje en pareja
    ".mapa-ubicacion",   // mapa
    "#cal-link",         // calendario
    ".qr",               // QR
    "button[onclick='toggleAudio()']" // botón música
  ];

  partes.forEach((selector, i) => {
    const el = document.querySelector(selector);
    if (el) {
      el.classList.add("fade-in", `fade-delay-${i + 1}`);
    }
  });
}

// Al cargar la página, aplicar animaciones
window.addEventListener('DOMContentLoaded', () => {
  actualizarBotones();
  animarPrimeraCarga();
});

function mostrarSorpresa() {
  alert("TE QUIERO CUCHIPU 🎉💖");
  // O podrías mostrar una foto especial, mensaje, etc.
}

function abrirSorpresa() {
  document.getElementById("modal-sorpresa").style.display = "none";
  iniciarCorazones();
  init(); // tu función de siempre
}

function iniciarCorazones() {
  tsParticles.load("confetti-bg", {
    fullScreen: { enable: true, zIndex: 1 },
    particles: {
      number: { value: 60 },
      shape: {
        type: "char",
        character: {
          value: ["❤️", "💖", "💕"],
          font: "Verdana",
          style: "",
          weight: "400"
        }
      },
      color: { value: "#ff4d4d" },
      opacity: { value: 0.9 },
      size: { value: 16 },
      move: { enable: true, direction: "bottom", speed: 2 }
    }
  });
}
