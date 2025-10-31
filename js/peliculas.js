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

  const botones = document.createElement("div");
  botones.classList.add("acciones");

  const btnEditar = document.createElement("button");
  btnEditar.textContent = "Editar";
  btnEditar.classList.add("btn-editar");

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "Eliminar";
  btnEliminar.classList.add("btn-eliminar");

  // Asignar eventos
  btnEditar.addEventListener("click", () => editarPelicula(pelicula));
  btnEliminar.addEventListener("click", () => eliminarPelicula(pelicula));

  botones.appendChild(btnEditar);
  botones.appendChild(btnEliminar);
  tarjeta.appendChild(botones);


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

// --- Función para eliminar una película ---
export function eliminarPelicula(pelicula) {
  const index = catalogo.indexOf(pelicula);
  if (index !== -1) {
    catalogo.splice(index, 1);
    guardarEnLocalStorage();
    renderizarCatalogo();
  }
}

// --- Función para editar una película ---
export function editarPelicula(pelicula) {
  const tituloInput = document.getElementById("titulo");
  const directorInput = document.getElementById("director");
  const anioInput = document.getElementById("anio");
  const generoInput = document.getElementById("genero");
  const valoracionInput = document.getElementById("valoracion");

  // Cargar datos en formulario
  tituloInput.value = pelicula.titulo;
  directorInput.value = pelicula.director;
  anioInput.value = pelicula.anio;
  generoInput.value = pelicula.genero;
  valoracionInput.value = pelicula.valoracion;

  // Al guardar, actualizar la película
  const formulario = document.getElementById("formulario");
  formulario.onsubmit = function (e) {
    e.preventDefault();
    pelicula.titulo = tituloInput.value;
    pelicula.director = directorInput.value;
    pelicula.anio = anioInput.value;
    pelicula.genero = generoInput.value;
    pelicula.valoracion = valoracionInput.value;
    guardarEnLocalStorage();
    renderizarCatalogo();

    formulario.reset();
    formulario.onsubmit = null; // Restablecer comportamiento original si lo hay
  };
}

export function guardarEnLocalStorage() {
  localStorage.setItem("catalogo", JSON.stringify(catalogo));
}

export function cargarDesdeLocalStorage() {
  const datos = localStorage.getItem("catalogo");
  if (datos) {
    const array = JSON.parse(datos);
    catalogo.length = 0;
    catalogo.push(...array);
  }
}


// --- Al cargar la página ---
window.addEventListener("DOMContentLoaded", () => {
  cargarDesdeLocalStorage();
  renderizarCatalogo();
});
