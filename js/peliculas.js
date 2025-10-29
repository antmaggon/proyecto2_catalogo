// js/peliculas.js

// Arreglo para almacenar las películas/series
export const catalogo = [];

/**
 * Crea una tarjeta HTML para una película o serie
 * @param {Object} pelicula - Objeto con datos: título, director, año, género, valoración, imagen (opcional)
 * @returns {HTMLElement} Tarjeta renderizada
 */
export function crearTarjeta(pelicula) {
  const tarjeta = document.createElement("div");
  tarjeta.classList.add("tarjeta");

  tarjeta.innerHTML = `
    ${pelicula.imagen
      ? `<img src="${pelicula.imagen}" alt="Portada de ${pelicula.titulo}" class="portada">`
      : `<div class="sin-imagen">Sin imagen</div>`}
    <h3>${pelicula.titulo}</h3>
    <p><strong>Director:</strong> ${pelicula.director}</p>
    <p><strong>Año:</strong> ${pelicula.anio}</p>
    <p><strong>Género:</strong> ${pelicula.genero}</p>
    <p><strong>Valoración:</strong> ⭐ ${pelicula.valoracion}/10</p>
  `;

  return tarjeta;
}

/**
 * Renderiza todo el catálogo en la página
 */
export function renderizarCatalogo() {
  const contenedor = document.getElementById("catalogo");
  const contador = document.getElementById("contador");

  // Limpiar contenido previo
  contenedor.innerHTML = "";

  // Agregar cada película como tarjeta
  catalogo.forEach((pelicula) => {
    const tarjeta = crearTarjeta(pelicula);
    contenedor.appendChild(tarjeta);
  });

  // Actualizar contador dinámico
  contador.textContent = catalogo.length;
}

