import { catalogo, renderizarCatalogo } from "./peliculas.js";

const STORAGE_KEY = "catalogoPeliculas";

const PELICULAS_POR_DEFECTO = [
  {
    titulo: "Inception",
    director: "Christopher Nolan",
    anio: 2010,
    genero: "Ciencia Ficción",
    valoracion: 9,
    imagen: "portadas_por_defecto/inception.png",
  },
  {
    titulo: "The Shawshank Redemption",
    director: "Frank Darabont",
    anio: 1994,
    genero: "Drama",
    valoracion: 10,
    imagen: "portadas_por_defecto/shawshank.png",
  },
  {
    titulo: "The Matrix",
    director: "Lana Wachowski, Lilly Wachowski",
    anio: 1999,
    genero: "Ciencia Ficción",
    valoracion: 9,
    imagen: "portadas_por_defecto/matrix.png",
  },
];


export function cargarDesdeStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    const guardadas = JSON.parse(data);
    catalogo.splice(0, catalogo.length, ...guardadas);
  } else {
    catalogo.splice(0, catalogo.length, ...PELICULAS_POR_DEFECTO);
    guardarEnStorage();
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
