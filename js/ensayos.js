import { scroll } from "./scroll.js";
import { toggleMenu } from "./toggleMenu.js";
import { ensayos } from "./contenido-ensayos.js";

scroll();
const botonesFiltro = document.querySelectorAll(".botones-filtro");

window.toggleMenu = toggleMenu;

botonesFiltro.forEach((botones) => {
  botones.addEventListener("click", (e) => {
    botonesFiltro.forEach((boton) => {
      if (!e.currentTarget.classList.contains("btn-grad")) {
        e.currentTarget.classList.replace("btn-glass", "btn-grad");
        boton.classList.replace("btn-grad", "btn-glass");
      }
    });
  });
});

ensayos.forEach((ensayo) => {
  const contenedorEnsayos = document.getElementById("contenedor-ensayos");
  contenedorEnsayos.innerHTML += ensayo.contenido;
  
});

window.ordenarRecientes = ordenarRecientes;
window.ordenarAntiguos = ordenarAntiguos;
const contenedorEnsayos = document.getElementById("contenedor-ensayos");
function ordenarRecientes() {
  contenedorEnsayos.innerHTML = "";
  const recienteAntiguo = ensayos
    .slice()
    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  recienteAntiguo.forEach((ensayo) => {
    contenedorEnsayos.innerHTML += ensayo.contenido;
  });
}
function ordenarAntiguos() {
  contenedorEnsayos.innerHTML = "";
  const antiguoReciente = ensayos
    .slice()
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  antiguoReciente.forEach((ensayo) => {
    contenedorEnsayos.innerHTML += ensayo.contenido;
  });
}
ordenarRecientes()