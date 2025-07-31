// Variables globales
let audioPermitido = false;
let audio = null;

// Función para inicializar el audio
function initAudio() {
  if (!audio) {
    audio = new Audio('assets/music.mp3');
    audio.loop = true;
    audio.volume = 0.3;
  }
}

// Función para manejar el audio
function toggleAudio() {
  try {
    initAudio(); // Asegurarse que el audio está inicializado
    const icon = document.querySelector('.audio-control i');
    const audioControl = document.querySelector('.audio-control');
    
    if (!audio) {
      console.error("Audio no inicializado");
      return;
    }

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
  } catch (error) {
    console.error("Error en toggleAudio:", error);
  }
}

// Función para inicializar la página
function init(){
  startCounter();
  generateCalendarLink();
  generateQr();
  actualizarBotones();
  animarPrimeraCarga();
  initAudio(); // Inicializar el audio al cargar
  
  // Configurar el control de audio
  const audioControl = document.querySelector('.audio-control');
  if (audioControl) {
    audioControl.addEventListener('click', toggleAudio);
  }
}

// Resto de tus funciones se mantienen igual...
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

function empezarSorpresa() {
  const pantalla = document.getElementById("pantalla-inicial");
  if (pantalla) {
    pantalla.style.opacity = 0;
    setTimeout(() => {
      pantalla.style.display = "none";
      const tarjeta = document.querySelector(".tarjeta");
      if (tarjeta) tarjeta.style.display = "block";
      iniciarCorazones();
      init();
    }, 800);
  }
}

// ... (mantén el resto de tus funciones igual) ...

// Al final del archivo:
document.addEventListener('DOMContentLoaded', function() {
  // Configurar el reajuste de imagen al cambiar tamaño
  window.addEventListener('resize', ajustarImagenInicial);
  
  // Ajustar imagen inicial después de un breve retraso
  setTimeout(ajustarImagenInicial, 100);
});
