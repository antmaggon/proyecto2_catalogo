# 🎥 Catálogo de Películas / Series

Este proyecto es una aplicación web sencilla para **gestionar y visualizar un catálogo de películas y series**. Permite al usuario agregar nuevos títulos con su información relevante (título, director, año, género, valoración y opcionalmente una imagen) y luego los muestra en una lista dinámica.



---

## 💻 Tecnologías Utilizadas

El proyecto está desarrollado con tecnologías web estándar:

* **HTML5:** Estructura de la página y el formulario.
* **CSS3:** Estilos (se asume un archivo `css/styles.css`).
* **JavaScript (ES Modules):** Lógica de la aplicación, manejo del formulario y renderizado dinámico del catálogo.

---

## 🚀 Estructura del Proyecto

Se espera la siguiente estructura de archivos:

## ✨ Funcionalidades

1.  **Formulario de Adición:** Permite ingresar los detalles de una nueva película o serie.
    * Campos obligatorios: Título, Director, Año, Género y Valoración (1-10).
    * Campo opcional: Imagen (se guarda como Base64).
2.  **Catálogo Dinámico:** Muestra todos los títulos agregados en formato de tarjetas.
3.  **Contador:** Muestra el número total de elementos en el catálogo.
4.  **Almacenamiento Temporal:** Los datos se almacenan en un *array* de JavaScript (`catalogo` en `js/peliculas.js`) y persisten únicamente durante la sesión actual del navegador.

---

## ⚙️ Cómo Ejecutar

1.  **Clona o descarga** este repositorio.
2.  Asegúrate de tener la estructura de archivos mencionada arriba (`index.html`, carpeta `js` con los dos archivos JS).
3.  Abre el archivo `index.html` en tu navegador web. **Se recomienda** usar una extensión de servidor local (como "Live Server" en VS Code) para que el módulo JS (`type="module"`) funcione correctamente en todos los navegadores.

---

## 📄 Archivos Clave

### `index.html`

* Contiene el *header*, un formulario para agregar elementos (`id="formulario"`) y una sección para mostrar el catálogo (`id="catalogo"`).
* Incluye el script principal: `<script type="module" src="js/formulario.js"></script>`.

### `js/peliculas.js`

* **`catalogo` (export):** El array principal que contiene todos los objetos de películas/series.
* **`crearTarjeta(pelicula)` (export):** Función que toma un objeto de película y retorna el elemento HTML de la tarjeta. Maneja la visualización de la imagen (o el marcador "Sin imagen").
* **`renderizarCatalogo()` (export):** Limpia el contenedor del catálogo (`id="catalogo"`) y renderiza todas las películas del array `catalogo`. También actualiza el contador.

### `js/formulario.js`

* Importa `catalogo` y `renderizarCatalogo` de `./peliculas.js`.
* Maneja el evento `submit` del formulario.
* Recoge los datos del formulario, incluyendo la **conversión opcional de la imagen a Base64** mediante `FileReader`.
* Crea un nuevo objeto de película/serie, lo añade al `catalogo` y llama a `renderizarCatalogo()` para actualizar la vista.
* Limpia el formulario después de una adición exitosa.