import { catalogo, renderizarCatalogo } from "./peliculas.js";

const STORAGE_KEY = "catalogoPeliculas";

export function cargarDesdeStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    const guardadas = JSON.parse(data);
    catalogo.splice(0, catalogo.length, ...guardadas); // ✅ actualiza referencia
  }
  renderizarCatalogo();
}

export function guardarEnStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(catalogo));
}

export function agregarPelicula(pelicula) {
  catalogo.push(pelicula);
  guardarEnStorage();
  renderizarCatalogo();
}

export function actualizarPelicula(index, peliculaActualizada) {
  catalogo[index] = peliculaActualizada;
  guardarEnStorage();
  renderizarCatalogo();
}

export function eliminarPelicula(index) {
  catalogo.splice(index, 1);
  guardarEnStorage();
  renderizarCatalogo();
}
