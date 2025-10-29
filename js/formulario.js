// js/formulario.js
import { catalogo, renderizarCatalogo } from "./peliculas.js";

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario");

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    // Captura de datos
    const titulo = document.getElementById("titulo").value.trim();
    const director = document.getElementById("director").value.trim();
    const anio = document.getElementById("anio").value.trim();
    const genero = document.getElementById("genero").value;
    const valoracion = document.getElementById("valoracion").value.trim();
    const archivoImagen = document.getElementById("imagen").files[0];

    // Validación básica
    if (!titulo || !director || !anio || !genero || !valoracion) {
      alert("Por favor completa todos los campos antes de agregar la película.");
      return;
    }

    // Función interna para agregar la película al catálogo
    function agregarPelicula(imagenBase64) {
      const nuevaPelicula = {
        titulo,
        director,
        anio,
        genero,
        valoracion,
        imagen: imagenBase64 || null,
      };

      catalogo.push(nuevaPelicula);
      renderizarCatalogo();
      formulario.reset();
    }

    // Leer imagen si existe
    if (archivoImagen) {
      const reader = new FileReader();
      reader.onload = (event) => {
        agregarPelicula(event.target.result);
      };
      reader.readAsDataURL(archivoImagen);
    } else {
      agregarPelicula(null);
    }
  });
});
