# Cuaderno Year 11 — guía para continuar el proyecto

> **Si eres una sesión nueva de Claude y no tienes contexto previo: lee este archivo entero
> antes de tocar nada.** Contiene todo lo necesario para seguir trabajando sin la
> conversación original.

## Qué es esto

Web de estudio de **Miguel** (Grade 10 / Year 11), construida a partir de las **fotos de sus
apuntes de clase**. Él manda fotos, Claude las convierte en lecciones.

| | Enlace |
|---|---|
| **La web** (lo que él usa para estudiar) | https://claude.ai/artifact/63QzH5AgpcC7uNzAMqRR6K |
| **Repositorio** | https://github.com/G10web/g10web |
| **Carpeta local** | `C:\Users\Locotoo\Documents\year11` |

El idioma de trabajo con él es **español**.

---

## El flujo habitual: Miguel manda fotos

Es el 90 % de lo que pasa en este proyecto. Cuando mande fotos de apuntes:

1. **Guarda las fotos** en `fotos/` con nombre descriptivo
   (`fis-05-fuerzas-newton.jpg`, `mat-01-cuadraticas.jpg`). Suele tenerlas en
   `C:\Users\Locotoo\Pictures\Camera Roll`; se copian, no se mueven.
2. **Verifica todos los números con Python** antes de escribir nada. Crea
   `verificacion/verificar_<tema>.py` que recalcule cada cuenta del apunte y la compare con lo
   que está escrito a mano. Esto no es opcional: es cómo se detectan los errores del cuaderno.
3. **Escribe la lección** en el archivo de la asignatura (ver más abajo).
4. **Comprueba la sintaxis**: `node --check fisica.js`
5. **Publica** (ver más abajo). Siempre con `url`, nunca sin él.
6. **Cuenta en el chat qué errores encontraste** en los apuntes y qué has añadido.

### Antes de actualizar una lección existente

**Lee primero en qué está fallando.** Herramienta `ArtifactData`, `action: "list"`,
`collection: "progreso"`, con la `url` del artifact. Cada documento es una lección y trae, por
comprobación: `ok`, `aciertos`, `fallos`, `aLaPrimera`, `mode`, `pregunta` y los últimos
`intentos` con la respuesta exacta que dio.

Cómo interpretarlo:

- Falla las de `mode: "concept"` → **el concepto no está claro**. Hay que reexplicarlo de otra
  manera, no añadir más ejercicios.
- Falla las de `mode: "drill"` pero acierta las de concepto → son signos, unidades o redondeo.
  Ahí sí: más práctica.
- Las respuestas concretas de `intentos` dicen *qué* error comete. Poner `12,5` donde la
  respuesta es `-12,5` es un problema de signos, no de cálculo.

---

## Reglas que pidió Miguel (no negociables)

1. **Todos los cálculos con Python.** Ningún número se publica sin recalcularlo en un script.
2. **Las fotos de los apuntes NO se muestran en la web.** Son solo la fuente. La web lleva
   diagramas SVG y gráficas propias, dibujados desde cero. Tampoco se ponen créditos tipo
   "fuente: foto 1". `fotos/` está en `.gitignore` y no se sube a GitHub.
3. **Los errores del cuaderno van en caja roja**, con el bloque `fix` (cuatro zonas: lo que
   pone tachado, por qué está mal, lo correcto en verde, cómo evitarlo).
4. **Dos tipos de ejercicio, en secciones separadas**: `mode: 'drill'` (mecánica, practicar el
   procedimiento) y `mode: 'concept'` (comprobar que ha entendido la idea de verdad).
5. **Todo bilingüe** español/inglés con `D('español', 'english')`. Sus apuntes están en inglés.
6. **Visualmente atractiva.** Diagramas, no muros de texto.

## Enseña como su profesor de Física

Descifrado de sus apuntes. Mantén este vocabulario y este orden:

**Los seis pasos:** dibujo de la situación → lista de datos con la incógnita marcada `?` →
elegir la ecuación por la variable que ignora → despejar → sustituir en unidades del SI →
comprobar con una segunda ecuación.

**Los motes de las ecuaciones** (las nombra por lo que *no* llevan):

| Mote | Ecuación | No lleva |
|---|---|---|
| DOVE | a = Δv / Δt | Δx |
| t-squared | Δx = vᵢt + ½at² | v_f |
| timeless | v_f² = vᵢ² + 2aΔx | t |

Usa recuadros de restricción (su "CONSTANT VELOCITY ONLY!") e historias con personajes y
situaciones cotidianas.

---

## Estructura del código

| Archivo | Contenido |
|---|---|
| `index.html` | Estructura, estilos y carga de scripts. Aquí van los `<style>` y los `<script src>`. |
| `app.js` | Router, render bilingüe, gráficas en canvas, progreso. **No suele hacer falta tocarlo.** |
| `data.js` | `SUBJECTS` (asignaturas y unidades), `DIA` (diagramas SVG) y `const LESSONS = {}` |
| `fisica.js` | Las lecciones de Física, vía `Object.assign(LESSONS, {...})` |
| `verificacion/` | Los scripts de Python que comprueban los números |
| `fotos/` | Fotos de los apuntes. Solo fuente. No se suben ni se muestran. |

### Añadir una asignatura nueva

1. Crea `mates.js` con `Object.assign(LESSONS, { ... });`
2. Enlázalo en `index.html`, después de `data.js`:
   `<script src="mates.js" charset="UTF-8"></script>`
   (el `charset` es obligatorio: sin él el navegador rompe los acentos)
3. Rellena `units` de esa asignatura en `SUBJECTS`, dentro de `data.js`.

### Formato de una lección

```js
'id-de-la-leccion': {
  subject: 'phys',                        // 'phys' | 'math'
  title: D('Título en español', 'English title'),
  en: 'English subtitle',
  lede: D('Entradilla de dos líneas.', 'Two-line intro.'),
  blocks: [ /* ver catálogo */ ]
}
```

### Catálogo de bloques

```js
{t:'h', title:D('Sección','Section'), sub:'English label'}   // abre sección, se numera sola
{t:'p', html:D('<strong>Texto</strong>…','…')}
{t:'ul', items:[D('uno','one'), D('dos','two')]}
{t:'key',  title:D('…','…'), html:D('…','…')}                // caja de acento: idea clave
{t:'warn', title:D('…','…'), html:D('…','…')}                // caja ámbar: error típico
{t:'note', title:D('…','…'), html:D('…','…')}                // caja gris
{t:'fx', tex:R`\frac{a}{b}`, cap:D('pie','caption')}         // fórmula destacada
{t:'vocab', head:[D('Magnitud','Quantity'),'English'], rows:[[…],[…]]}
{t:'svg', title:D('…','…'), svg:DIA.nombre, cap:D('…','…')}  // diagrama
{t:'plot', title:D('…','…'), h:300, x:[0,10], y:[-2,5],
  xstep:1, ystep:1, xlabel:'t (s)', ylabel:'x (m)',
  series:[{type:'poly', pts:[[0,0],[2,4]], color:'accent', label:'x(t)'},
          {type:'fn', f:function(t){return t*t;}, color:'ok'}],
  points:[{x:2,y:4,label:D('aquí','here')}],
  fill:{pts:[[0,0],[3,0],[0,15]], label:D('área','area')},
  cap:D('…','…')}
{t:'ex', title:D('…','…'), stmt:D('…','…'), given:['vᵢ = 15 m/s','t = ?'],
  steps:[{do:R`$$…$$`, why:D('por qué','why')}], result:R`…`}
{t:'guided', title:D('…','…'), stmt:D('…','…'), given:[…],
  steps:[{ask:D('¿…?','…?'), hint:D('…','…'), sol:R`$$…$$`}], result:R`…`}
{t:'fix', title:D('…','…'),
  wrong:'lo que pone en el apunte',      // se muestra tachado
  why:D('por qué está mal','…'),
  right:'la versión correcta',           // se muestra en verde
  note:D('opcional','…'), tip:D('cómo no volver a caer','…')}
{t:'check', kind:'num', mode:'drill', q:D('…','…'),
  answer:22.5, tol:0.05, unit:'m', explain:D('…','…')}
{t:'check', kind:'mc', mode:'concept', q:D('…','…'),
  options:[D('a','a'),D('b','b')], answer:0, explain:D('…','…')}
```

Notas:

- `R` es `String.raw`: úsalo siempre que el texto lleve LaTeX, para no escapar las barras.
- Las fórmulas van con `$…$` (en línea) o `$$…$$` (en bloque). Las renderiza MathJax.
- Los colores de `plot` son `'accent'`, `'ok'`, `'bad'`, `'phys2'`.
- **Los acentos dentro de un SVG** van como entidades (`&#243;` para ó), no como carácter.
- Los números en español llevan **coma** decimal: `22{,}5` en LaTeX.

---

## Publicar

```
Artifact
  url: "https://claude.ai/artifact/63QzH5AgpcC7uNzAMqRR6K"
  file_path: "C:\Users\Locotoo\Documents\year11\index.html"
  files: {"data.js":"data.js", "fisica.js":"fisica.js", "app.js":"app.js"}
```

- **Siempre con `url`.** Sin él se crea un artifact nuevo y Miguel pierde su progreso.
- Añade cada archivo nuevo de asignatura a `files`.
- **No pases `capabilities` al republicar**: se conserva el `{db: {}}` que ya tiene. Pasarlo a
  medias lo revocaría y borraría el acceso al progreso.
- No pases `favicon` ni `title` otra vez: ya los tiene.

## Cómo se guarda el progreso

Un documento por lección en `progreso/<lessonId>`, mediante la capacidad `db`. Respaldo en
`localStorage` para cuando abre sin sesión.

Cada comprobación se identifica por un **hash del texto de la pregunta**, no por su posición.
Eso significa que se pueden añadir o reordenar ejercicios sin descolocar lo que ya hizo. Pero
**cambiar el texto de una pregunta reinicia esa comprobación** — tenlo en cuenta al corregir
una errata en un enunciado.

---

## Entorno

- **Python**: disponible como `python`. Se usa para verificar los cálculos.
- **Node**: solo para `node --check archivo.js` (comprobar sintaxis antes de publicar).
- **gh**: en `C:\Program Files\GitHub CLI\gh.exe`. Si una terminal dice que no lo reconoce,
  es que se abrió antes de instalarlo:
  `$env:Path += ";C:\Program Files\GitHub CLI"`
- **GitHub**: `G10web` es una **organización**, no una cuenta de usuario. La cuenta personal
  de Miguel (`miguelzuza`) ya es miembro, así que se publica ahí con su sesión normal. Si
  `gh auth status` dice `miguelzuza`, está bien y no hay que cambiar nada.
- Los commits de este repositorio van como `Miguel Zuza <miguel.zuza@gmail.com>`.
- Para ver la web en local hace falta un servidor (con `file://` no cargan los scripts):
  `python -m http.server 8777`, ya configurado en `.claude/launch.json`.

## Estado actual

- **Física — Unidad 1: Cinemática**: 5 lecciones terminadas (el método del profesor, posición y
  desplazamiento, gráficas x-t y v-t, aceleración, y las correcciones de los apuntes).
  Salen de 4 fotos de "Kinematics" y "Acceleration".
- **Matemáticas**: vacía, esperando fotos.
- Se documentaron **6 errores** de los apuntes, todos en la lección `correcciones`.
