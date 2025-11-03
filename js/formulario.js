import {
  agregarPelicula,
  actualizarPelicula,
  cargarDesdeStorage,
} from "./storage.js";

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario");
  const inputImagen = document.getElementById("imagen");

  cargarDesdeStorage();

  formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const titulo = formulario.titulo.value.trim();
    const director = formulario.director.value.trim();
    const anio = formulario.anio.value.trim();
    const genero = formulario.genero.value;
    const valoracion = formulario.valoracion.value.trim();
    const archivoImagen = inputImagen.files[0];

    if (!titulo || !director || !anio || !genero || !valoracion) {
      alert("Por favor completa todos los campos antes de guardar la película.");
      return;
    }

    const imagenBase64 = archivoImagen
      ? await leerImagenBase64(archivoImagen)
      : null;

    const nuevaPelicula = {
      titulo,
      director,
      anio: Number(anio),
      genero,
      valoracion: Number(valoracion),
      imagen: imagenBase64,
    };

    const editIndex = formulario.dataset.editIndex;

    if (editIndex !== undefined && editIndex !== "") {
      actualizarPelicula(parseInt(editIndex), nuevaPelicula);
      delete formulario.dataset.editIndex;

      const boton = formulario.querySelector(".btn-agregar");
      boton.textContent = "Agregar al catálogo";
      boton.classList.remove("modo-edicion");

      mostrarMensaje("Película actualizada correctamente ✅", "success");
    } else {

      agregarPelicula(nuevaPelicula);
      mostrarMensaje("Película agregada al catálogo 🎬", "success");
    }

    formulario.reset();
  });
});

function leerImagenBase64(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.readAsDataURL(file);
  });
}

function mostrarMensaje(texto, tipo = "info") {
  let mensaje = document.createElement("div");
  mensaje.textContent = texto;
  mensaje.className = `mensaje-flotante ${tipo}`;
  document.body.appendChild(mensaje);

  setTimeout(() => {
    mensaje.classList.add("visible");
  }, 50);

  setTimeout(() => {
    mensaje.classList.remove("visible");
    setTimeout(() => mensaje.remove(), 300);
  }, 2000);
}
