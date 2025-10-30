# Catálogo: Funcionalidades de Toni

## Introducción
Esta documentación describe en detalle las funcionalidades implementadas por Toni para la segunda parte del proyecto2_catalogo. El objetivo es dotar al catálogo de una experiencia de búsqueda, filtrado y orden intuitiva, pensando siempre en la facilidad de uso y el enfoque didáctico.

---

## Funcionalidades implementadas

1. **Búsqueda en tiempo real por título**
2. **Filtro por género**
3. **Filtro por director**
4. **Botón "Ver mejor valoradas"** (ordenar por valoración descendente)
5. **Botón "Limpiar Filtros"** (resetea todos los controles)

---

## Instrucciones de uso

### 1. Búsqueda en tiempo real
- En el campo "Buscar por título", comienza a escribir (no hace falta pulsar Enter).
- Los resultados se filtran automáticamente mostrando solo las películas/series cuyo título contiene el texto introducido, sin importar mayúsculas/minúsculas ni tildes.
- Puedes combinar la búsqueda con cualquier filtro.

### 2. Filtro por género
- Selecciona un género en el desplegable "Género".
- Solo se mostrarán producciones de ese género.
- El desplegable se rellena automáticamente según los géneros presentes en el catálogo.

### 3. Filtro por director
- Selecciona un director en el desplegable "Director".
- Solo se mostrarán producciones de ese director.
- El desplegable se rellena automáticamente según los directores presentes en el catálogo.

### 4. Botón "Ver mejor valoradas"
- Al pulsar el botón, la lista de películas/series actuales se ordena de mayor a menor valoración (10, 9, ... 1).
- Si pulsas el botón de nuevo, se vuelve al orden de inserción original.
- Funciona combinado con cualquier búsqueda o filtro activo.

### 5. Botón "Limpiar Filtros"
- Vacía la búsqueda, pone género y director en "Todos" y desactiva la ordenación de mejores valoradas.
- Así, la lista se muestra como recién cargada, en orden de inserción y sin filtros.

---

## Ejemplos de uso

1. **Búsqueda activa:**
    - Escribe "star" en el buscador. Aparecen todas las pelis/series con "star" en el título.
    - Filtra por género "Ciencia Ficción": solo salen las que cumplen los dos filtros.

2. **Ordenar por valoración:**
    - Pulsa "Ver mejor valoradas". Arriba verás primero la peli/serie con mayor puntuación del catálogo.
    - El cambia a "Ver orden normal" para volver al orden de subida.

3. **Limpiar todo:**
    - Cambia filtros, escribe en buscar y activa "Ver mejor valoradas".
    - Pulsa "Limpiar Filtros". Todo vuelve a estado original.

---

## Buenas prácticas aplicadas
- Código fácil de seguir y comentado.
- Uso de tipos sencillos: strings y números, sin técnicas avanzadas.
- Cada funcionalidad es independiente y fácil de modificar.
- El catálogo siempre se muestra acorde a los controles activos.
- La interfaz impide estados "raros" (p. ej., repetir géneros o directores en los selects).

---

## Notas y limitaciones conocidas
- El sistema sólo funciona en memoria (no hay base de datos ni LocalStorage en esta parte).
- No hay paginación: si hubiese muchísimas pelis, la lista sería larga.
- Las imágenes sólo se muestran si las introduces al añadir película/serie.
- Todos los filtros se "combinan": puedes buscar, filtrar y ordenar a la vez.
- El sistema es ideal para aprender manipulación de arrays, DOM y lógica de filtrado sencilla.
