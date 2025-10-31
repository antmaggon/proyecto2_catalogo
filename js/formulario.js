// js/formulario.js
import { catalogo, renderizarCatalogo, agregarOActualizarPelicula } from "./peliculas.js";

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario");

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const director = document.getElementById("director").value.trim();
    const anio = document.getElementById("anio").value.trim();
    const genero = document.getElementById("genero").value;
    const valoracion = document.getElementById("valoracion").value.trim();
    const archivoImagen = document.getElementById("imagen").files[0];

    if (!titulo || !director || !anio || !genero || !valoracion) {
      alert("Por favor completa todos los campos antes de guardar la película.");
      return;
    }

    // Si hay imagen, leerla
    if (archivoImagen) {
      const reader = new FileReader();
      reader.onload = (event) => {
        agregarOActualizarPelicula(event.target.result);
        formulario.reset();
        renderizarCatalogo();
      };
      reader.readAsDataURL(archivoImagen);
    } else {
      agregarOActualizarPelicula(null);
      formulario.reset();
      renderizarCatalogo();
    }
  });
});
