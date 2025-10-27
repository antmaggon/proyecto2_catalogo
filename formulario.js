// formulario.js
import { catalogo, crearTarjeta } from "./peliculas.js";

const formulario = document.getElementById("formulario");
const catalogoDiv = document.getElementById("catalogo");
const contador = document.getElementById("contador");

// Escuchar envío del formulario
formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  // Capturar datos del formulario
  const nuevaPelicula = {
    titulo: document.getElementById("titulo").value,
    director: document.getElementById("director").value,
    anio: document.getElementById("anio").value,
    genero: document.getElementById("genero").value,
    valoracion: document.getElementById("valoracion").value,
  };

  // Agregar al catálogo
  catalogo.push(nuevaPelicula);

  // Crear y mostrar tarjeta
  const tarjeta = crearTarjeta(nuevaPelicula);
  catalogoDiv.appendChild(tarjeta);

  // Actualizar contador
  contador.textContent = catalogo.length;

  // Resetear formulario
  formulario.reset();
});
