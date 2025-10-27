// ===============================
// peliculas.js
// ===============================

// Array para almacenar las películas/series
const catalogoPeliculas = [];

/**
 * Agrega una nueva película al catálogo
 * @param {Object} pelicula - Objeto con los datos de la película
 */
function agregarPelicula(pelicula) {
  catalogoPeliculas.push(pelicula);
  actualizarContador();
  mostrarPeliculas();
}

/**
 * Devuelve todas las películas del catálogo
 * @returns {Array}
 */
function obtenerPeliculas() {
  return catalogoPeliculas;
}

/**
 * Actualiza el contador visual de películas
 */
function actualizarContador() {
  const contador = document.getElementById("contador");
  contador.textContent = catalogoPeliculas.length;
}

/**
 * Muestra todas las películas en el catálogo visualmente (como tarjetas)
 */
function mostrarPeliculas() {
  const contenedor = document.getElementById("contenedor-catalogo");
  contenedor.innerHTML = ""; // Limpia antes de volver a renderizar

  catalogoPeliculas.forEach((pelicula) => {
	// Crea una tarjeta
	const tarjeta = document.createElement("div");
	tarjeta.classList.add("tarjeta");

	tarjeta.innerHTML = `
  	<h3>${pelicula.titulo}</h3>
  	<p><strong>Director:</strong> ${pelicula.director}</p>
  	<p><strong>Año:</strong> ${pelicula.anio}</p>
  	<p><strong>Género:</strong> ${pelicula.genero}</p>
  	<p><strong>Valoración:</strong> ⭐ ${pelicula.valoracion}/10</p>
	`;

	contenedor.appendChild(tarjeta);
  });
}