
function mostrar(pantallaId) {
  document.querySelectorAll('.pantalla').forEach(p => p.classList.remove('activa'));
  document.getElementById(pantallaId).classList.add('activa');

  // Control dinámico del menú
  const menu = document.getElementById('menu');
  menu.innerHTML = '';
  if (pantallaId === 'comidas') {
    menu.innerHTML += '<button onclick="mostrar(\'inicio\')">Inicio</button>';
    menu.innerHTML += '<button onclick="mostrar(\'actividades\')">Actividades</button>';
  } else if (pantallaId === 'actividades') {
    menu.innerHTML += '<button onclick="mostrar(\'inicio\')">Inicio</button>';
    menu.innerHTML += '<button onclick="mostrar(\'comidas\')">Comidas</button>';
  } else {
    menu.innerHTML += '<button onclick="mostrar(\'comidas\')">Comidas</button>';
    menu.innerHTML += '<button onclick="mostrar(\'actividades\')">Actividades</button>';
  }
}
