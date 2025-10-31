// js/filtros.js
import { catalogo, crearTarjeta, renderizarCatalogo } from "./peliculas.js";

function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function renderizarListaFiltrada(listaFiltrada) {
  const contenedor = document.getElementById("catalogo");
  const contador = document.getElementById("contador");

  contenedor.innerHTML = "";
  listaFiltrada.forEach((pelicula) => {
    const tarjeta = crearTarjeta(pelicula);
    contenedor.appendChild(tarjeta);
  });

  contador.textContent = listaFiltrada.length;
}

// Estado simple si el usuario quiere ver el catálogo ordenado por valoración descendente
let modoOrdenadoValoracion = false;

// Guardar una copia de referencia del orden inicial (de inserción) por si hace falta
let idsOrdenOriginal = [];

// Inicializa la captura de ids si el catálogo cambia (solo si aún no hay ids)
function snapshotOrdenOriginal() {
  if (idsOrdenOriginal.length !== catalogo.length) {
    idsOrdenOriginal = catalogo.map((pel, i) => i); // indices por orden de insercion
  }
}

function obtenerListaFiltrada() {
  const input = document.getElementById("busqueda");
  const selectGenero = document.getElementById("filtro-genero");
  const selectDirector = document.getElementById("filtro-director");

  const consulta = normalizarTexto((input?.value || "").trim());
  const generoSeleccionado = selectGenero?.value || "__todos__";
  const directorSeleccionado = selectDirector?.value || "__todos__";

  // Aplica los filtros
  let filtradas = catalogo.filter((p) => {
    const coincideBusqueda = consulta === "" || normalizarTexto(p.titulo || "").includes(consulta);
    const coincideGenero = generoSeleccionado === "__todos__" || p.genero === generoSeleccionado;
    const coincideDirector = directorSeleccionado === "__todos__" || p.director === directorSeleccionado;
    return coincideBusqueda && coincideGenero && coincideDirector;
  });

  // Si el modo ordenado por valoración está activo, ordena descendente (mayor a menor), tiebreak: titulo ASC
  if (modoOrdenadoValoracion) {
    filtradas = filtradas.slice().sort((a, b) => {
      const valA = Number(a.valoracion) || 0;
      const valB = Number(b.valoracion) || 0;
      if (valA !== valB) return valB - valA;
      // Si empatan en valoracion, ordena por título ascendente
      return (a.titulo||"").localeCompare(b.titulo||"");
    });
  } else {
    // Si modo normal: intenta mantener el orden de inserción aprovechando el snapshot de ids
    filtradas = filtradas.slice().sort((a, b) => {
      // Encuentra su primer index en catalogo
      const idxA = catalogo.indexOf(a);
      const idxB = catalogo.indexOf(b);
      return idxA - idxB;
    });
  }

  return filtradas;
}

function aplicarFiltrosInterno() {
  const lista = obtenerListaFiltrada();
  renderizarListaFiltrada(lista);
}

function poblarOpcionesFiltros() {
  const selectGenero = document.getElementById("filtro-genero");
  const selectDirector = document.getElementById("filtro-director");
  if (!selectGenero || !selectDirector) return;

  const generos = new Set();
  const directores = new Set();

  catalogo.forEach((p) => {
    if (p.genero) generos.add(p.genero);
    if (p.director) directores.add(p.director);
  });

  const valorGeneroActual = selectGenero.value || "__todos__";
  const valorDirectorActual = selectDirector.value || "__todos__";

  selectGenero.innerHTML = "";
  selectDirector.innerHTML = "";

  const opcionTodos = (texto) => {
    const opt = document.createElement("option");
    opt.value = "__todos__";
    opt.textContent = "Todos";
    return opt;
  };

  selectGenero.appendChild(opcionTodos("Todos"));
  Array.from(generos).sort().forEach((g) => {
    const opt = document.createElement("option");
    opt.value = g;
    opt.textContent = g;
    selectGenero.appendChild(opt);
  });

  selectDirector.appendChild(opcionTodos("Todos"));
  Array.from(directores).sort().forEach((d) => {
    const opt = document.createElement("option");
    opt.value = d;
    opt.textContent = d;
    selectDirector.appendChild(opt);
  });

  selectGenero.value = generos.has(valorGeneroActual) ? valorGeneroActual : "__todos__";
  selectDirector.value = directores.has(valorDirectorActual) ? valorDirectorActual : "__todos__";
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("busqueda");
  if (input) input.addEventListener("input", aplicarFiltrosInterno);

  const selectGenero = document.getElementById("filtro-genero");
  const selectDirector = document.getElementById("filtro-director");
  if (selectGenero) selectGenero.addEventListener("change", aplicarFiltrosInterno);
  if (selectDirector) selectDirector.addEventListener("change", aplicarFiltrosInterno);

  // Botón de mejor valoradas
  const btnMejorValoradas = document.getElementById("btn-mejor-valoradas");
  if (btnMejorValoradas) {
    btnMejorValoradas.addEventListener("click", () => {
      modoOrdenadoValoracion = !modoOrdenadoValoracion;
      btnMejorValoradas.textContent = modoOrdenadoValoracion ? "Ver orden normal" : "Ver mejor valoradas";
      aplicarFiltrosInterno();
    });
  }

  // Botón limpiar filtros
  const btnLimpiarFiltros = document.getElementById("btn-limpiar-filtros");
  if (btnLimpiarFiltros) {
    btnLimpiarFiltros.addEventListener("click", () => {
      // Resetea búsqueda
      const input = document.getElementById("busqueda");
      if (input) input.value = "";
      // Resetea selects
      const selectGenero = document.getElementById("filtro-genero");
      const selectDirector = document.getElementById("filtro-director");
      if (selectGenero) selectGenero.value = "__todos__";
      if (selectDirector) selectDirector.value = "__todos__";
      // Desactiva modo ordenado mejor valoradas
      if (modoOrdenadoValoracion) {
        modoOrdenadoValoracion = false;
        const btnMejorValoradas = document.getElementById("btn-mejor-valoradas");
        if (btnMejorValoradas) btnMejorValoradas.textContent = "Ver mejor valoradas";
      }
      aplicarFiltrosInterno();
    });
  }

  poblarOpcionesFiltros();

  const formulario = document.getElementById("formulario");
  if (formulario) {
    formulario.addEventListener("submit", () => {
      setTimeout(() => {
        poblarOpcionesFiltros();
        snapshotOrdenOriginal();
        aplicarFiltrosInterno();
      }, 10);
    });
  }
});

// Export para uso futuro si se combinan más filtros desde otros módulos
export function aplicarFiltros() {
  aplicarFiltrosInterno();
}


