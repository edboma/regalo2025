function init(){
  startCounter();
  generateCalendarLink();
  generateQr();
  actualizarBotones();
  animarPrimeraCarga();
}

function iniciarCorazones() {
  tsParticles.load("confetti-bg", {
    fullScreen:{enable:true,zIndex:1},
    particles:{
      number:{value:50},
      shape:{type:"char", character:{value:"❤", font:"Verdana", style:"", weight:"400"}},
      color:{value:"#FF69B4"},
      opacity:{value:0.7},
      size:{value:14},
      move:{enable:true, direction:"bottom", speed:2}
    }
  });
}

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

function mostrar(id){
  document.querySelectorAll('.pantalla').forEach(s=>s.classList.remove('activa'));
  document.getElementById(id).classList.add('activa');
  document.body.className = id;
  actualizarBotones();
}

function toggleAudio() {
  const audio = document.getElementById('audio');
  if (audio.paused) {
    audio.play().catch(e => {
      console.warn("Autoplay bloqueado, necesita interacción del usuario.");
    });
  } else {
    audio.pause();
  }
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

function animarPrimeraCarga() {
  const partes = [
    "h1", "#contador-text", "#inicio h2",
    ".mapa-ubicacion", "#cal-link", ".qr", 
    "button[onclick='toggleAudio()']"
  ];
  partes.forEach((selector, i) => {
    const el = document.querySelector(selector);
    if (el) {
      el.classList.add("fade-in", `fade-delay-${i + 1}`);
    }
  });
}
