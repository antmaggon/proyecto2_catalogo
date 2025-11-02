import { eliminarPelicula } from "./storage.js";

export const catalogo = [];

export function crearTarjeta(pelicula, index) {
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

    <div class="acciones">
      <button class="btn-editar" data-index="${index}">✏️ Editar</button>
      <button class="btn-eliminar" data-index="${index}">🗑️ Eliminar</button>
    </div>
  `;

  return tarjeta;
}


export function renderizarCatalogo() {
  const contenedor = document.getElementById("catalogo");
  const contador = document.getElementById("contador");
  contenedor.innerHTML = "";

  catalogo.forEach((pelicula, index) => {
    const tarjeta = crearTarjeta(pelicula, index);
    contenedor.appendChild(tarjeta);
  });

  contador.textContent = catalogo.length;
}

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("catalogo");

  contenedor.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const index = parseInt(btn.dataset.index);

    if (btn.classList.contains("btn-eliminar")) {
      if (confirm("¿Seguro que deseas eliminar esta película?")) {
        eliminarPelicula(index);
      }
    } else if (btn.classList.contains("btn-editar")) {
      cargarPeliculaEnFormulario(index);
    }
  });
});


function cargarPeliculaEnFormulario(index) {
  const pelicula = catalogo[index];
  if (!pelicula) return;

  const formulario = document.getElementById("formulario");
  formulario.titulo.value = pelicula.titulo;
  formulario.director.value = pelicula.director;
  formulario.anio.value = pelicula.anio;
  formulario.genero.value = pelicula.genero;
  formulario.valoracion.value = pelicula.valoracion;

  formulario.dataset.editIndex = index;

  const boton = formulario.querySelector(".btn-agregar");
  boton.textContent = "💾 Guardar cambios";
  boton.classList.add("modo-edicion");

  formulario.classList.add("editando");
  
  formulario.scrollIntoView({ behavior: "smooth", block: "start" });
}
