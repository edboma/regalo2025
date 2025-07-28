function mostrar(id) {
  document.querySelectorAll('.pantalla').forEach(sec => sec.classList.remove('activa'));
  document.getElementById(id).classList.add('activa');
}

// Contador
const destino = new Date("2025-09-18T00:00:00");
const contador = document.getElementById("contador");

function actualizarContador() {
  const ahora = new Date();
  const diferencia = destino - ahora;

  if (diferencia <= 0) {
    contador.textContent = "¡Ya ha llegado el viaje!";
    return;
  }

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
  const segundos = Math.floor((diferencia / 1000) % 60);

  contador.textContent = `Faltan ${dias}d ${horas}h ${minutos}m ${segundos}s para el viaje`;
}

setInterval(actualizarContador, 1000);
actualizarContador();