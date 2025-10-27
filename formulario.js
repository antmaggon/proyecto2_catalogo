// js/formulario.js
import { catalogo, crearTarjeta } from "./peliculas.js";

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario");
  const catalogoDiv = document.getElementById("catalogo");
  const contador = document.getElementById("contador");

  // Escuchar envío del formulario
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    // Capturar datos del formulario
    const nuevaPelicula = {
      titulo: document.getElementById("titulo").value.trim(),
      director: document.getElementById("director").value.trim(),
      anio: document.getElementById("anio").value.trim(),
      genero: document.getElementById("genero").value,
      valoracion: document.getElementById("valoracion").value.trim(),
    };

    // Validar campos
    if (
      !nuevaPelicula.titulo ||
      !nuevaPelicula.director ||
      !nuevaPelicula.anio ||
      !nuevaPelicula.genero ||
      !nuevaPelicula.valoracion
    ) {
      alert("Por favor completa todos los campos antes de agregar la película.");
      return;
    }

    // Agregar al catálogo
    catalogo.push(nuevaPelicula);

    // Crear y mostrar tarjeta
    const tarjeta = crearTarjeta(nuevaPelicula);
    catalogoDiv.appendChild(tarjeta);

    // Actualizar contador
    contador.textContent = catalogo.length;

    // Limpiar formulario
    formulario.reset();
  });
});
