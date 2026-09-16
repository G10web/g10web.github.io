/* Cuaderno Year 11 - base: asignaturas, diagramas y contenedor de lecciones.
   El contenido de cada asignatura va en su propio archivo (fisica.js, mates.js...).
   Todos los numeros estan verificados con Python (scratch/verificar_*.py).

   Texto bilingue: D('espanol', 'english'). Las formulas y los numeros no se traducen. */

const R = String.raw;
function D(es, en) { return { es: es, en: en }; }

const SUBJECTS = [
  {
    id: 'phys', name: 'Física', en: 'Physics',
    blurb: D('Cinemática: describir el movimiento con posición, velocidad y aceleración.',
             'Kinematics: describing motion with position, velocity and acceleration.'),
    units: [
      {
        name: D('Unidad 1 · Cinemática', 'Unit 1 · Kinematics'),
        lessons: ['metodo', 'cinematica-basica', 'graficas-movimiento', 'aceleracion', 'correcciones']
      }
    ]
  },
  {
    id: 'math', name: 'Matemáticas', en: 'Mathematics',
    blurb: D('Esperando tus fotos de clase para montar las lecciones.',
             'Waiting for your class photos to build the lessons.'),
    units: []
  }
];

/* ---------- diagramas ---------- */
const DIA = {

viaje: R`<svg viewBox="0 0 680 210" xmlns="http://www.w3.org/2000/svg" font-family="IBM Plex Mono, monospace">
  <defs>
    <marker id="ar" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
      <polygon points="0 0, 9 3.5, 0 7" fill="var(--accent)"/></marker>
    <marker id="ar2" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
      <polygon points="0 0, 9 3.5, 0 7" fill="var(--chem)"/></marker>
  </defs>
  <line x1="50" y1="125" x2="640" y2="125" stroke="var(--line-2)" stroke-width="2"/>
  <line x1="60" y1="115" x2="60" y2="135" stroke="var(--ink-3)" stroke-width="2"/>
  <line x1="560" y1="115" x2="560" y2="135" stroke="var(--ink-3)" stroke-width="2"/>
  <text x="60" y="152" fill="var(--ink-3)" font-size="12" text-anchor="middle">x = 0</text>
  <text x="560" y="152" fill="var(--ink-3)" font-size="12" text-anchor="middle">x = 1200 m</text>
  <text x="60" y="108" fill="var(--ink)" font-size="13" text-anchor="middle" font-weight="600">A</text>
  <text x="560" y="108" fill="var(--ink)" font-size="13" text-anchor="middle" font-weight="600">B</text>
  <line x1="64" y1="66" x2="554" y2="66" stroke="var(--accent)" stroke-width="2.5" marker-end="url(#ar)"/>
  <text x="307" y="54" fill="var(--accent-ink)" font-size="12.5" text-anchor="middle">&#916;x = +1200 m &#183; 600 s &#183; v = +2 m/s</text>
  <line x1="556" y1="184" x2="66" y2="184" stroke="var(--chem)" stroke-width="2.5" marker-end="url(#ar2)"/>
  <text x="307" y="203" fill="var(--chem-ink)" font-size="12.5" text-anchor="middle">&#916;x = &#8722;1200 m &#183; 200 s &#183; v = &#8722;6 m/s</text>
  <text x="655" y="130" fill="var(--ink-3)" font-size="13">x</text>
</svg>`,

campo: R`<svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" font-family="IBM Plex Mono, monospace">
  <defs><marker id="arc" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
    <polygon points="0 0, 9 3.5, 0 7" fill="var(--accent)"/></marker></defs>
  <rect x="150" y="45" width="390" height="215" fill="none" stroke="var(--line-2)" stroke-width="2" rx="3"/>
  <line x1="345" y1="45" x2="345" y2="260" stroke="var(--line-2)" stroke-width="1.5"/>
  <circle cx="345" cy="152" r="34" fill="none" stroke="var(--line-2)" stroke-width="1.5"/>
  <rect x="150" y="105" width="34" height="95" fill="none" stroke="var(--line-2)" stroke-width="1.5"/>
  <rect x="506" y="105" width="34" height="95" fill="none" stroke="var(--line-2)" stroke-width="1.5"/>
  <path d="M150 45 L540 45 L540 260 L150 260 Z" fill="none" stroke="var(--accent)" stroke-width="3"
        stroke-dasharray="7 5" marker-end="url(#arc)" opacity="0.85"/>
  <circle cx="150" cy="45" r="6" fill="var(--accent)"/>
  <line x1="150" y1="278" x2="540" y2="278" stroke="var(--ink-3)" stroke-width="1"/>
  <text x="345" y="294" fill="var(--ink-3)" font-size="12" text-anchor="middle">105 m</text>
  <line x1="560" y1="45" x2="560" y2="260" stroke="var(--ink-3)" stroke-width="1"/>
  <text x="590" y="157" fill="var(--ink-3)" font-size="12">68 m</text>
  <text x="345" y="140" fill="var(--ink-2)" font-size="13" text-anchor="middle">d = 346 m</text>
  <text x="345" y="172" fill="var(--ink-2)" font-size="13" text-anchor="middle">&#916;x = 0</text>
</svg>`,

distDesp: R`<svg viewBox="0 0 680 230" xmlns="http://www.w3.org/2000/svg" font-family="IBM Plex Mono, monospace">
  <defs><marker id="ard" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
    <polygon points="0 0, 10 4, 0 8" fill="var(--chem)"/></marker></defs>
  <path d="M90 170 C 160 40, 250 200, 330 90 S 480 200, 590 80" fill="none"
        stroke="var(--accent)" stroke-width="3" stroke-linecap="round"/>
  <line x1="90" y1="170" x2="583" y2="82" stroke="var(--chem)" stroke-width="2.5"
        stroke-dasharray="6 5" marker-end="url(#ard)"/>
  <circle cx="90" cy="170" r="6" fill="var(--ink)"/>
  <circle cx="590" cy="80" r="6" fill="var(--ink)"/>
  <text x="250" y="40" fill="var(--accent-ink)" font-size="12.5">d</text>
  <text x="330" y="150" fill="var(--chem-ink)" font-size="12.5">&#916;x</text>
</svg>`,

frenada: R`<svg viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg" font-family="IBM Plex Mono, monospace">
  <defs>
    <marker id="arv" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
      <polygon points="0 0, 9 3.5, 0 7" fill="var(--ok)"/></marker>
    <marker id="ara" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
      <polygon points="0 0, 9 3.5, 0 7" fill="var(--bad)"/></marker>
  </defs>
  <line x1="40" y1="150" x2="640" y2="150" stroke="var(--line-2)" stroke-width="2"/>
  <rect x="230" y="105" width="120" height="34" rx="7" fill="var(--surface-3)" stroke="var(--line-2)" stroke-width="1.5"/>
  <path d="M252 105 L268 86 L318 86 L332 105 Z" fill="var(--surface-3)" stroke="var(--line-2)" stroke-width="1.5"/>
  <circle cx="258" cy="142" r="11" fill="var(--ink-3)"/>
  <circle cx="326" cy="142" r="11" fill="var(--ink-3)"/>
  <line x1="360" y1="76" x2="540" y2="76" stroke="var(--ok)" stroke-width="4" marker-end="url(#arv)"/>
  <text x="450" y="64" fill="var(--ok)" font-size="13" text-anchor="middle" font-weight="600">v = +15 m/s</text>
  <line x1="220" y1="76" x2="120" y2="76" stroke="var(--bad)" stroke-width="4" marker-end="url(#ara)"/>
  <text x="170" y="64" fill="var(--bad)" font-size="13" text-anchor="middle" font-weight="600">a = &#8722;5 m/s&#178;</text>
  <text x="600" y="172" fill="var(--ink-3)" font-size="12">+x &#8594;</text>
</svg>`,

rampa: R`<svg viewBox="0 0 680 260" xmlns="http://www.w3.org/2000/svg" font-family="IBM Plex Mono, monospace">
  <defs>
    <marker id="arr1" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
      <polygon points="0 0, 9 3.5, 0 7" fill="var(--ok)"/></marker>
    <marker id="arr2" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
      <polygon points="0 0, 9 3.5, 0 7" fill="var(--bad)"/></marker>
  </defs>
  <line x1="60" y1="215" x2="600" y2="70" stroke="var(--line-2)" stroke-width="3"/>
  <line x1="60" y1="215" x2="600" y2="215" stroke="var(--line)" stroke-width="1.5" stroke-dasharray="5 5"/>
  <g transform="translate(210 168) rotate(-15)">
    <rect x="-34" y="-13" width="68" height="17" rx="5" fill="var(--accent)" opacity="0.85"/>
    <circle cx="-20" cy="9" r="7" fill="var(--ink-3)"/>
    <circle cx="20" cy="9" r="7" fill="var(--ink-3)"/>
  </g>
  <line x1="262" y1="128" x2="380" y2="97" stroke="var(--ok)" stroke-width="4" marker-end="url(#arr1)"/>
  <text x="330" y="84" fill="var(--ok)" font-size="13" font-weight="600">v = +10 m/s</text>
  <line x1="180" y1="188" x2="92" y2="211" stroke="var(--bad)" stroke-width="4" marker-end="url(#arr2)"/>
  <text x="96" y="238" fill="var(--bad)" font-size="13" font-weight="600">a = &#8722;5 m/s&#178;</text>
  <circle cx="470" cy="110" r="6" fill="var(--ink)"/>
  <text x="486" y="105" fill="var(--ink)" font-size="12.5">v = 0</text>
  <text x="486" y="124" fill="var(--ink-3)" font-size="12.5">&#916;x = 10 m, t = 2 s</text>
</svg>`,

signos: R`<svg viewBox="0 0 680 250" xmlns="http://www.w3.org/2000/svg" font-family="IBM Plex Mono, monospace">
  <defs>
    <marker id="s1" markerWidth="8" markerHeight="6.5" refX="7" refY="3.25" orient="auto">
      <polygon points="0 0, 8 3.25, 0 6.5" fill="var(--ok)"/></marker>
    <marker id="s2" markerWidth="8" markerHeight="6.5" refX="7" refY="3.25" orient="auto">
      <polygon points="0 0, 8 3.25, 0 6.5" fill="var(--bad)"/></marker>
  </defs>
  <line x1="340" y1="20" x2="340" y2="235" stroke="var(--line)" stroke-width="1.5"/>
  <line x1="30" y1="128" x2="650" y2="128" stroke="var(--line)" stroke-width="1.5"/>
  <text x="60" y="44" fill="var(--ink)" font-size="13" font-weight="600">v &gt; 0 , a &gt; 0</text>
  <line x1="60" y1="66" x2="180" y2="66" stroke="var(--ok)" stroke-width="3.5" marker-end="url(#s1)"/>
  <line x1="60" y1="90" x2="140" y2="90" stroke="var(--bad)" stroke-width="3.5" marker-end="url(#s2)"/>
  <text x="380" y="44" fill="var(--ink)" font-size="13" font-weight="600">v &gt; 0 , a &lt; 0</text>
  <line x1="380" y1="66" x2="500" y2="66" stroke="var(--ok)" stroke-width="3.5" marker-end="url(#s1)"/>
  <line x1="460" y1="90" x2="380" y2="90" stroke="var(--bad)" stroke-width="3.5" marker-end="url(#s2)"/>
  <text x="60" y="164" fill="var(--ink)" font-size="13" font-weight="600">v &lt; 0 , a &lt; 0</text>
  <line x1="180" y1="186" x2="60" y2="186" stroke="var(--ok)" stroke-width="3.5" marker-end="url(#s1)"/>
  <line x1="140" y1="210" x2="60" y2="210" stroke="var(--bad)" stroke-width="3.5" marker-end="url(#s2)"/>
  <text x="380" y="164" fill="var(--ink)" font-size="13" font-weight="600">v &lt; 0 , a &gt; 0</text>
  <line x1="500" y1="186" x2="380" y2="186" stroke="var(--ok)" stroke-width="3.5" marker-end="url(#s1)"/>
  <line x1="380" y1="210" x2="460" y2="210" stroke="var(--bad)" stroke-width="3.5" marker-end="url(#s2)"/>
</svg>`,

metodo: R`<svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" font-family="IBM Plex Mono, monospace">
  <defs><marker id="mf" markerWidth="8" markerHeight="7" refX="7" refY="3.5" orient="auto">
    <polygon points="0 0, 8 3.5, 0 7" fill="var(--ink-3)"/></marker></defs>
  <g>
    <rect x="30" y="30" width="180" height="76" rx="9" fill="var(--surface-2)" stroke="var(--accent)" stroke-width="2"/>
    <text x="120" y="56" fill="var(--accent-ink)" font-size="12" text-anchor="middle" font-weight="600">1</text>
    <text x="120" y="78" fill="var(--ink)" font-size="12.5" text-anchor="middle">DIBUJO</text>
    <text x="120" y="96" fill="var(--ink-3)" font-size="11" text-anchor="middle">la situaci&#243;n</text>
  </g>
  <line x1="215" y1="68" x2="245" y2="68" stroke="var(--ink-3)" stroke-width="2" marker-end="url(#mf)"/>
  <g>
    <rect x="250" y="30" width="180" height="76" rx="9" fill="var(--surface-2)" stroke="var(--accent)" stroke-width="2"/>
    <text x="340" y="56" fill="var(--accent-ink)" font-size="12" text-anchor="middle" font-weight="600">2</text>
    <text x="340" y="78" fill="var(--ink)" font-size="12.5" text-anchor="middle">DATOS</text>
    <text x="340" y="96" fill="var(--ink-3)" font-size="11" text-anchor="middle">lista + la inc&#243;gnita = ?</text>
  </g>
  <line x1="435" y1="68" x2="465" y2="68" stroke="var(--ink-3)" stroke-width="2" marker-end="url(#mf)"/>
  <g>
    <rect x="470" y="30" width="180" height="76" rx="9" fill="var(--surface-2)" stroke="var(--accent)" stroke-width="2"/>
    <text x="560" y="56" fill="var(--accent-ink)" font-size="12" text-anchor="middle" font-weight="600">3</text>
    <text x="560" y="78" fill="var(--ink)" font-size="12.5" text-anchor="middle">ECUACI&#211;N</text>
    <text x="560" y="96" fill="var(--ink-3)" font-size="11" text-anchor="middle">la que ignora lo que sobra</text>
  </g>
  <path d="M560 112 L560 132 L120 132 L120 152" fill="none" stroke="var(--ink-3)" stroke-width="2" marker-end="url(#mf)"/>
  <g>
    <rect x="30" y="158" width="180" height="76" rx="9" fill="var(--surface-2)" stroke="var(--accent)" stroke-width="2"/>
    <text x="120" y="184" fill="var(--accent-ink)" font-size="12" text-anchor="middle" font-weight="600">4</text>
    <text x="120" y="206" fill="var(--ink)" font-size="12.5" text-anchor="middle">DESPEJAR</text>
    <text x="120" y="224" fill="var(--ink-3)" font-size="11" text-anchor="middle">antes de sustituir</text>
  </g>
  <line x1="215" y1="196" x2="245" y2="196" stroke="var(--ink-3)" stroke-width="2" marker-end="url(#mf)"/>
  <g>
    <rect x="250" y="158" width="180" height="76" rx="9" fill="var(--surface-2)" stroke="var(--accent)" stroke-width="2"/>
    <text x="340" y="184" fill="var(--accent-ink)" font-size="12" text-anchor="middle" font-weight="600">5</text>
    <text x="340" y="206" fill="var(--ink)" font-size="12.5" text-anchor="middle">SUSTITUIR</text>
    <text x="340" y="224" fill="var(--ink-3)" font-size="11" text-anchor="middle">con unidades del SI</text>
  </g>
  <line x1="435" y1="196" x2="465" y2="196" stroke="var(--ink-3)" stroke-width="2" marker-end="url(#mf)"/>
  <g>
    <rect x="470" y="158" width="180" height="76" rx="9" fill="var(--surface-2)" stroke="var(--ok)" stroke-width="2"/>
    <text x="560" y="184" fill="var(--ok)" font-size="12" text-anchor="middle" font-weight="600">6</text>
    <text x="560" y="206" fill="var(--ink)" font-size="12.5" text-anchor="middle">COMPROBAR</text>
    <text x="560" y="224" fill="var(--ink-3)" font-size="11" text-anchor="middle">con otra ecuaci&#243;n</text>
  </g>
  <text x="340" y="268" fill="var(--ink-3)" font-size="11.5" text-anchor="middle">el mismo orden en los seis problemas del cuaderno</text>
</svg>`
};

/* Las lecciones se registran desde los archivos de cada asignatura. */
const LESSONS = {};
