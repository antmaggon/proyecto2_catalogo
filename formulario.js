// ===============================
// formulario.js
// ===============================

// Seleccionamos el formulario del DOM
const form = document.getElementById("formulario");

// Escuchamos el evento 'submit'
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Evita que se recargue la página

  // Capturamos los valores del formulario
  const titulo = document.getElementById("titulo").value.trim();
  const director = document.getElementById("director").value.trim();
  const anio = document.getElementById("anio").value.trim();
  const genero = document.getElementById("genero").value;
  const valoracion = document.getElementById("valoracion").value.trim();

  // Validación básica
  if (!titulo || !director || !anio || !genero || !valoracion) {
	alert("Por favor, completa todos los campos.");
	return;
  }

  // Creamos el objeto de la nueva película
  const nuevaPelicula = {
	titulo,
	director,
	anio,
	genero,
	valoracion
  };

  // Agregamos la película al catálogo (función definida en peliculas.js)
  agregarPelicula(nuevaPelicula);

  // Limpiamos el formulario
  form.reset();
});


