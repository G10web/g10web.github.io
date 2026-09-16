# g10web — Cuaderno Year 11

Web de estudio de Grade 10 (Year 11) construida a partir de mis apuntes de clase.
Bilingüe español / inglés, con botón para cambiar de idioma.

## Qué hay

- **Física — Unidad 1: Cinemática** (5 lecciones): el método de resolución del
  profesor, posición y desplazamiento, gráficas x-t y v-t, aceleración y las tres
  ecuaciones, y las correcciones de los apuntes.
- **Matemáticas**: pendiente.

Cada lección lleva teoría, diagramas, gráficas dibujadas a escala, ejemplos
resueltos paso a paso y dos bloques de ejercicios: **mecánica** (practicar el
procedimiento) y **concepto** (comprobar que la idea se ha entendido).

## Organización

| Archivo | Contenido |
|---|---|
| `index.html` | Estructura y estilos |
| `app.js` | Router, render bilingüe, gráficas en canvas, progreso |
| `data.js` | Asignaturas y diagramas SVG compartidos |
| `fisica.js` | Las lecciones de Física |
| `verificacion/` | Scripts de Python que comprueban todos los números |

Para añadir una asignatura: un archivo nuevo con `Object.assign(LESSONS, {...})`,
enlazado desde `index.html`.

## Verificar los números

Ningún resultado se publica sin recalcularlo:

```bash
python verificacion/verificar_cinematica.py
```

## Nota

Las fotos de los apuntes originales no forman parte del repositorio
(`.gitignore`): se quedan en local y solo sirven como fuente.
