# Catálogo: Funcionalidades de Sergio

## Introducción
Esta documentación describe las funcionalidades implementadas y los ajustes realizados por **Sergio** durante el desarrollo y depuración del proyecto.  
El objetivo fue conseguir un catálogo totalmente funcional que permita **añadir, editar, eliminar, buscar, filtrar y ordenar películas o series**, almacenando los datos de forma persistente con `localStorage`.

---

## Funcionalidades implementadas y corregidas

1. **Carga y persistencia en localStorage**
2. **Formulario funcional para añadir nuevas películas/series**
3. **Edición de elementos existentes sin duplicarlos**
4. **Eliminación inmediata del catálogo**
5. **Renderizado dinámico del catálogo en el DOM**
6. **Búsqueda en tiempo real**
7. **Filtros por género y director**
8. **Botón “Ver mejor valoradas” (orden descendente por valoración)**
9. **Botón “Limpiar filtros”**
10. **Reactivación automática de eventos tras edición o filtrado**
11. **Servidor local configurado (solución a error CORS)**

---

## Descripción técnica del trabajo realizado

### 1. Carga de scripts y estructura del proyecto
- Se corrigieron las rutas de los scripts en `index.html` para garantizar que cargaran correctamente desde la carpeta `/js`.
- Se ajustó el orden de importación de los módulos `peliculas.js`, `storage.js`, `formulario.js` y `filtros.js` para evitar dependencias circulares.
- Se mantuvo un único punto de renderizado (`renderizarCatalogo()`) para mantener la sincronía entre los datos y la interfaz.

### 2. Formulario (formulario.js)
- Se implementó la creación y actualización de películas usando funciones de `storage.js`.
- Se añadió la conversión de imágenes a **Base64** mediante `FileReader`, permitiendo mostrar la imagen en el catálogo sin necesidad de archivos externos.
- Se controló el flujo de edición usando `dataset.editIndex`, evitando duplicados en el catálogo.

### 3. Almacenamiento local (storage.js)
- Se configuró `localStorage` con una clave fija (`catalogoPeliculas`).
- Funciones principales:
  - `cargarDesdeStorage()`: carga inicial del catálogo.
  - `guardarEnStorage()`: sincroniza los cambios.
  - `agregarPelicula()`, `actualizarPelicula()` y `eliminarPelicula()`: operaciones CRUD completas.
- Se garantizó que los cambios en memoria y en pantalla estén siempre sincronizados.

### 4. Catálogo (peliculas.js)
- Renderiza todas las tarjetas del catálogo.
- Cada tarjeta incluye:
  - Imagen (si existe)
  - Título, director, año, género y valoración
  - Botones “Editar” y “Eliminar”
- Se creó la función `asignarEventosBotones()` para asociar dinámicamente los eventos de ambos botones después de cada renderizado.

### 5. Filtros y búsqueda (filtros.js)
- Implementada búsqueda en tiempo real por título (insensible a mayúsculas o tildes).
- Filtros automáticos por género y director, poblados dinámicamente según los valores presentes en el catálogo.
- Botón “Ver mejor valoradas”: ordena las películas de mayor a menor valoración.
- Botón “Limpiar filtros”: restablece todos los controles al estado inicial.
- Se añadió la **reasignación automática de eventos** tras aplicar filtros o editar una película, corrigiendo el bug que desactivaba los botones de edición después del primer uso.

### 6. Servidor local y corrección de CORS
- Al ejecutar el proyecto directamente con doble clic, Chrome bloqueaba los scripts (`Access to script blocked by CORS policy`).
- Se solucionó probando una extensión llamada Live Server y abriendo el proyecto con esta.