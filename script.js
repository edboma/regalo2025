// =============================================
// VARIABLES GLOBALES
// =============================================
let audioPermitido = false;
let audio = null;
let particulasIniciadas = false;
let intervaloContador = null;

// =============================================
// FUNCIONES DE AUDIO
// =============================================

function initAudio() {
  try {
    if (!audio) {
      audio = new Audio();
      audio.loop = true;
      audio.volume = 0.3;
      audio.preload = 'auto';
      
      // Fuentes de audio para mejor compatibilidad
      const sourceMP3 = document.createElement('source');
      sourceMP3.src = 'assets/music.mp3';
      sourceMP3.type = 'audio/mpeg';
      
      const sourceOGG = document.createElement('source');
      sourceOGG.src = 'assets/music.ogg';
      sourceOGG.type = 'audio/ogg';
      
      audio.appendChild(sourceMP3);
      audio.appendChild(sourceOGG);
      
      audio.addEventListener('error', (e) => {
        console.error("Error en el audio:", e);
        mostrarErrorAudio();
      });
    }
  } catch (error) {
    console.error("Error al inicializar audio:", error);
    mostrarErrorAudio();
  }
}

function toggleAudio() {
  try {
    if (!audio) initAudio();
    if (!audio) return;

    const icon = document.querySelector('.audio-control i');
    const audioControl = document.querySelector('.audio-control');
    
    if (!icon || !audioControl) return;

    // Efecto visual
    audioControl.classList.add('pulsando');
    setTimeout(() => audioControl.classList.remove('pulsando'), 200);
    
    if (audio.paused) {
      audioPermitido = true;
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(_ => {
            icon.classList.remove('fa-music');
            icon.classList.add('fa-pause');
          })
          .catch(error => {
            console.error("Error al reproducir:", error);
            if (audioPermitido) {
              mostrarAlertaAudio();
            }
          });
      }
    } else {
      audio.pause();
      icon.classList.remove('fa-pause');
      icon.classList.add('fa-music');
    }
  } catch (error) {
    console.error("Error en toggleAudio:", error);
  }
}

function mostrarErrorAudio() {
  try {
    const audioControl = document.querySelector('.audio-control');
    if (audioControl) {
      audioControl.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
      audioControl.title = "Error al cargar el audio";
      audioControl.onclick = null;
    }
  } catch (error) {
    console.error("Error al mostrar error de audio:", error);
  }
}

function mostrarAlertaAudio() {
  try {
    const contenedor = document.createElement('div');
    contenedor.className = 'alerta-audio';
    contenedor.innerHTML = `
      <p>El navegador no puede reproducir el audio. Por favor:</p>
      <ol>
        <li>Verifica que el archivo de audio exista en la carpeta assets</li>
        <li>Prueba con otro navegador</li>
        <li>Si usas Brave, haz clic en el icono del escudo y desactiva las protecciones</li>
      </ol>
    `;
    document.body.appendChild(contenedor);
    setTimeout(() => {
      if (contenedor.parentNode) {
        contenedor.parentNode.removeChild(contenedor);
      }
    }, 10000);
  } catch (error) {
    console.error("Error al mostrar alerta:", error);
  }
}

// =============================================
// FUNCIONES DEL CONTADOR
// =============================================

function startCounter() {
  try {
    // Limpiar intervalo previo si existe
    if (intervaloContador) {
      clearInterval(intervaloContador);
    }

    const target = new Date("2025-09-18T00:00:00");
    const contador = document.getElementById("contador-text");
    if (!contador) return;

    const actualizarContador = () => {
      const now = new Date();
      const diff = target - now;
      
      if (diff < 0) {
        contador.textContent = "¡Llegó el día!";
        clearInterval(intervaloContador);
        return;
      }
      
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      
      contador.textContent = `Faltan ${d}d ${h}h ${m}m ${s}s para el viaje`;
    };

    actualizarContador();
    intervaloContador = setInterval(actualizarContador, 1000);
  } catch (error) {
    console.error("Error en startCounter:", error);
  }
}

// =============================================
// FUNCIONES DE INTERFAZ
// =============================================

function ajustarImagenInicial() {
  try {
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
  } catch (error) {
    console.error("Error en ajustarImagenInicial:", error);
  }
}

function animarPrimeraCarga() {
  try {
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
  } catch (error) {
    console.error("Error en animarPrimeraCarga:", error);
  }
}

function mostrar(id) {
  try {
    document.querySelectorAll('.pantalla').forEach(s => s.classList.remove('activa'));
    const seccion = document.getElementById(id);
    if (seccion) {
      seccion.classList.add('activa');
      document.body.className = id;
      actualizarBotones();
    }
  } catch (error) {
    console.error("Error en mostrar:", error);
  }
}

function actualizarBotones() {
  try {
    const nav = document.getElementById('botones-nav');
    if (!nav) return;

    const seccion = document.querySelector('.pantalla.activa');
    if (!seccion) return;

    let botones = [];
    const seccionId = seccion.id;

    if (seccionId === "inicio") {
      botones = [
        { id: "comidas", texto: "Comidas" },
        { id: "actividades", texto: "Actividades" }
      ];
    } else if (seccionId === "comidas") {
      botones = [
        { id: "inicio", texto: "Inicio" },
        { id: "actividades", texto: "Actividades" }
      ];
    } else if (seccionId === "actividades") {
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
  } catch (error) {
    console.error("Error en actualizarBotones:", error);
  }
}

// =============================================
// FUNCIONES DEL MAPA
// =============================================

function generateCalendarLink() {
  try {
    const start = "20250918T090000Z", end = "20250921T180000Z";
    const url = "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      "&text=Viaje%20en%20pareja" +
      "&dates=" + start + "/" + end +
      "&details=Viaje%20para%20disfrutar%20en%20Cork%20Valley" +
      "&location=" + encodeURIComponent("http://corkvalley.es/");
    
    const link = document.getElementById("cal-link");
    if (link) link.href = url;
  } catch (error) {
    console.error("Error en generateCalendarLink:", error);
  }
}

function generateQr() {
  try {
    const pageUrl = window.location.href;
    const qrImg = document.getElementById("qr-img");
    if (qrImg) {
      qrImg.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + 
                 encodeURIComponent(pageUrl);
    }
  } catch (error) {
    console.error("Error en generateQr:", error);
  }
}

// =============================================
// FUNCIONES DE PARTICULAS
// =============================================

function iniciarCorazones() {
  try {
    if (particulasIniciadas) return;
    
    tsParticles.load("confetti-bg", {
      fullScreen: { enable: true, zIndex: 1 },
      particles: {
        number: { value: 80 },
        shape: { 
          type: "char", 
          character: { 
            value: ["❤", "✨", "🎉", "🎁"], 
            font: "Verdana", 
            style: "", 
            weight: "400" 
          } 
        },
        color: { value: ["#FF69B4", "#FFD700", "#FF1493", "#00BFFF"] },
        opacity: { value: 0.7 },
        size: { value: 16 },
        move: { enable: true, direction: "bottom", speed: 3 }
      }
    });
    
    particulasIniciadas = true;
  } catch (error) {
    console.error("Error en iniciarCorazones:", error);
  }
}

// =============================================
// FUNCIONES DE INICIALIZACIÓN
// =============================================

function precargarImagenes() {
  try {
    const imagenes = [
      'assets/cris.jpg',
      'assets/comida1.jpg',
      'assets/comida2.jpg',
      'assets/comida3.jpg',
      'assets/actividad1.jpg',
      'assets/actividad2.jpg'
    ];
    
    imagenes.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  } catch (error) {
    console.error("Error en precargarImagenes:", error);
  }
}

function init() {
  try {
    // Inicializar componentes
    initAudio();
    startCounter();
    generateCalendarLink();
    generateQr();
    actualizarBotones();
    animarPrimeraCarga();
    precargarImagenes();
    
    // Configurar eventos
    const audioControl = document.querySelector('.audio-control');
    if (audioControl) {
      audioControl.style.display = 'flex';
      audioControl.addEventListener('click', toggleAudio);
    }
    
  } catch (error) {
    console.error("Error en init:", error);
  }
}

function empezarSorpresa() {
  try {
    const pantalla = document.getElementById("pantalla-inicial");
    if (!pantalla) return;
    
    pantalla.style.opacity = 0;
    setTimeout(() => {
      pantalla.style.display = "none";
      const tarjeta = document.querySelector(".tarjeta");
      if (tarjeta) {
        tarjeta.style.display = "block";
        iniciarCorazones();
      }
      init();
    }, 800);
  } catch (error) {
    console.error("Error en empezarSorpresa:", error);
  }
}

// =============================================
// INICIALIZACIÓN DE LA PÁGINA
// =============================================
document.addEventListener('DOMContentLoaded', function() {
  try {
    // Configurar el reajuste de imagen al cambiar tamaño
    window.addEventListener('resize', ajustarImagenInicial);
    
    // Ajustar imagen inicial después de un breve retraso
    setTimeout(() => {
      ajustarImagenInicial();
      
      // Iniciar la experiencia después de cargar los recursos
      setTimeout(init, 300);
    }, 100);
    
  } catch (error) {
    console.error("Error en DOMContentLoaded:", error);
  }
});
