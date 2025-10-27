// js/peliculas.js

// Arreglo para almacenar las películas/series
export const catalogo = [];

/**
 * Crea una tarjeta HTML para una película o serie
 * @param {Object} pelicula - Objeto con datos: título, director, año, género, valoración
 * @returns {HTMLElement} Tarjeta renderizada
 */
export function crearTarjeta(pelicula) {
  const tarjeta = document.createElement("div");
  tarjeta.classList.add("tarjeta");

  tarjeta.innerHTML = `
    <h3>${pelicula.titulo}</h3>
    <p><strong>Director:</strong> ${pelicula.director}</p>
    <p><strong>Año:</strong> ${pelicula.anio}</p>
    <p><strong>Género:</strong> ${pelicula.genero}</p>
    <p><strong>Valoración:</strong> ⭐ ${pelicula.valoracion}/10</p>
  `;

  return tarjeta;
}
