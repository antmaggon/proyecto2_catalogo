// peliculas.js

// Arreglo para almacenar las películas/series
export const catalogo = [];

// Función para crear una tarjeta de película
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
