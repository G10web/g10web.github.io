/* Cuaderno Year 11 - router, render bilingue y graficas. */
(function () {
  'use strict';

  var main = document.getElementById('main');
  var sidebar = document.getElementById('sidebar');
  var tabs = document.getElementById('tabs');
  var menuBtn = document.getElementById('menuBtn');
  var themeBtn = document.getElementById('themeBtn');
  var langBtn = document.getElementById('langBtn');

  /* ---------- idioma ---------- */
  var LANG = 'es';
  try { LANG = localStorage.getItem('y11-idioma') === 'en' ? 'en' : 'es'; } catch (e) {}

  /* Resuelve un valor bilingue {es, en}. Deja pasar cadenas y numeros tal cual. */
  function T(v) {
    if (v == null) return v;
    if (Array.isArray(v)) return v.map(T);
    if (typeof v === 'object' && ('es' in v || 'en' in v)) {
      var out = v[LANG];
      return out != null ? out : (v.es != null ? v.es : v.en);
    }
    return v;
  }

  /* Textos de la interfaz. */
  var UI = {
    home:        { es: 'Inicio', en: 'Home' },
    lesson:      { es: 'Lección', en: 'Lesson' },
    worked:      { es: 'Ejemplo resuelto', en: 'Worked example' },
    guided:      { es: 'Ejercicio guiado', en: 'Guided practice' },
    answer:      { es: 'Resultado', en: 'Answer' },
    showStep:    { es: 'Ver el paso', en: 'Show step' },
    hideStep:    { es: 'Ocultar', en: 'Hide' },
    hint:        { es: 'Pista', en: 'Hint' },
    check:       { es: 'Comprobación', en: 'Check yourself' },
    numeric:     { es: 'respuesta numérica', en: 'numeric answer' },
    pickOne:     { es: 'elige una', en: 'pick one' },
    yourAnswer:  { es: 'tu respuesta', en: 'your answer' },
    checkBtn:    { es: 'Comprobar', en: 'Check' },
    correct:     { es: '¡Correcto!', en: 'Correct!' },
    incorrect:   { es: 'No es eso.', en: 'Not quite.' },
    already:     { es: 'Ya la acertaste.', en: 'You already got this one.' },
    keyIdea:     { es: 'Idea clave', en: 'Key idea' },
    watchOut:    { es: 'Ojo', en: 'Watch out' },
    note:        { es: 'Nota', en: 'Note' },
    fix:         { es: 'Error en el cuaderno', en: 'Error in your notes' },
    whatItSays:  { es: 'Lo que pone en tus apuntes', en: 'What your notes say' },
    whyWrong:    { es: 'Por qué está mal', en: 'Why it is wrong' },
    whatIsRight: { es: 'Lo correcto', en: 'The correct version' },
    howToAvoid:  { es: 'Para no volver a caer', en: 'How to avoid it' },
    drill:       { es: 'Mecánica', en: 'Drill' },
    concept:     { es: 'Concepto', en: 'Concept' },
    markDone:    { es: 'Marcar como repasada', en: 'Mark as revised' },
    markedDone:  { es: '✓ Repasada', en: '✓ Revised' },
    checksLabel: { es: 'comprobaciones', en: 'checks' },
    syncCloud:   { es: 'guardado y sincronizado', en: 'saved and synced' },
    syncLocal:   { es: 'guardado solo en este navegador', en: 'saved in this browser only' },
    syncChecking:{ es: 'conectando…', en: 'connecting…' },
    gateTitle:   { es: 'Cuaderno Year 11', en: 'Year 11 Notebook' },
    gateText:    { es: 'Escribe tu nombre para entrar.', en: 'Type your name to enter.' },
    gatePlaceholder: { es: 'tu nombre', en: 'your name' },
    gateBtn:     { es: 'Entrar', en: 'Enter' },
    gateError:   { es: 'Ese no es el nombre. Inténtalo otra vez.', en: 'That is not the name. Try again.' },
    bankTitle:   { es: 'Ejercicios', en: 'Exercises' },
    bankNotes:   { es: 'De los apuntes', en: 'From your notes' },
    bankNew1:    { es: 'Nuevas preguntas', en: 'New questions' },
    bankNew2:    { es: 'Nuevas · 2', en: 'New · 2' },
    bankHint:    { es: 'Las de los apuntes salen de los ejemplos de tu clase. Las nuevas son distintas, para practicar otra vez.',
                   en: 'The notes ones come from your own class examples. The new ones are different, to practise again.' },
    resetLesson: { es: 'Reiniciar mis respuestas', en: 'Reset my answers' },
    resetConfirm:{ es: 'Sí, borrar', en: 'Yes, delete' },
    resetWarn:   { es: 'se borran los aciertos de esta lección', en: "this lesson's answers will be deleted" },
    resetAll:    { es: 'Reiniciar todo el progreso', en: 'Reset all progress' },
    resetAllOk:  { es: 'Sí, borrar todo', en: 'Yes, delete everything' },
    resetAllWarn:{ es: 'se borra el progreso de todas las lecciones', en: 'progress in every lesson will be deleted' },
    prev:        { es: '← Anterior', en: '← Previous' },
    next:        { es: 'Siguiente →', en: 'Next →' },
    upcoming:    { es: 'Pendiente', en: 'Coming up' },
    moreSoon:    { es: 'Más lecciones cuando mandes fotos', en: 'More lessons when you send photos' },
    heroEyebrow: { es: 'Grade 10 · curso 2026', en: 'Grade 10 · 2026' },
    heroTitle:   { es: 'Todo lo de este año, explicado y comprobado',
                   en: 'Everything from this year, explained and checked' },
    heroText:    { es: 'Las lecciones salen de tus propios apuntes de clase. Cada número está verificado con Python, cada gráfica está dibujada a escala real y al final de cada lección hay comprobaciones para ver si te ha quedado claro.',
                   en: 'The lessons are built from your own class notes. Every number is verified with Python, every graph is drawn to real scale, and each lesson ends with checks so you can see whether it stuck.' },
    lessons:     { es: 'lecciones', en: 'lessons' },
    revised:     { es: 'repasadas', en: 'revised' },
    noLessons:   { es: 'sin lecciones aún', en: 'no lessons yet' },
    sendPhotos:  { es: 'manda fotos', en: 'send photos' },
    emptyTitle:  { es: 'Todavía no hay lecciones aquí', en: 'No lessons here yet' },
    emptyText:   { es: 'Mándame fotos de los apuntes de esta asignatura (teoría, ejercicios de clase, lo que tengas) y monto las lecciones con el mismo formato que las de Física.',
                   en: 'Send me photos of your notes for this subject (theory, class exercises, whatever you have) and I will build the lessons in the same format as the Physics ones.' }
  };
  function U(k) { return T(UI[k]); }

  /* ---------- progreso ----------
     Se guarda en dos sitios: localStorage (siempre, funciona sin sesion) y,
     cuando la capacidad `db` esta disponible, un documento por leccion en
     `progreso/<leccion>`, que sincroniza entre dispositivos y puedo leer yo
     para ver en que falla. La pagina funciona igual si `db` resuelve null. */
  var KEY = 'y11-progreso';
  var prog = {};
  try { prog = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { prog = {}; }

  var db = null;            // namespace de la capacidad, o null
  var dbEstado = 'local';   // 'local' | 'nube' | 'probando'

  /* Identificador estable de una comprobacion: hash del texto de la pregunta.
     Asi anadir o reordenar ejercicios no descoloca el progreso ya hecho. */
  function hashId(txt) {
    var h = 5381, i;
    for (i = 0; i < txt.length; i++) h = ((h * 33) ^ txt.charCodeAt(i)) >>> 0;
    return 'c' + h.toString(36);
  }
  function checkId(b) {
    var q = (b.q && (b.q.es || b.q)) || '';
    return hashId(String(q).replace(/<[^>]*>/g, '').slice(0, 300));
  }

  function pl(id) {
    if (!prog[id]) prog[id] = { done: false, checks: {} };
    if (!prog[id].checks) prog[id].checks = {};
    return prog[id];
  }

  /* ---------- tandas de ejercicios ----------
     'apuntes' son las preguntas sacadas de sus apuntes de clase;
     'nuevas1' y 'nuevas2' son tandas distintas para volver a practicar. */
  var TANDAS = ['apuntes', 'nuevas1', 'nuevas2'];
  var tandaActiva = {};
  try { tandaActiva = JSON.parse(localStorage.getItem('y11-tanda')) || {}; } catch (e) {}
  function tandaDe(lessonId) { return tandaActiva[lessonId] || 'apuntes'; }
  function ponerTanda(lessonId, t) {
    tandaActiva[lessonId] = t;
    try { localStorage.setItem('y11-tanda', JSON.stringify(tandaActiva)); } catch (e) {}
  }
  function tandasDe(lessonId) {
    var vistos = {};
    LESSONS[lessonId].blocks.forEach(function (b) {
      if (b.t === 'check') vistos[b.banco || 'apuntes'] = true;
    });
    return TANDAS.filter(function (t) { return vistos[t]; });
  }
  function saveLocal() { try { localStorage.setItem(KEY, JSON.stringify(prog)); } catch (e) {} }

  /* Una escritura a la vez por documento, encadenadas. */
  var colas = {};
  function guardar(lessonId) {
    saveLocal();
    if (!db) return;
    var previa = colas[lessonId] || Promise.resolve();
    colas[lessonId] = previa.then(function () {
      var p = pl(lessonId);
      return db.doc('progreso/' + lessonId).set({
        lessonId: lessonId,
        titulo: String(T(LESSONS[lessonId].title)),
        done: !!p.done,
        doneTs: p.doneTs || null,
        checks: p.checks,
        actualizado: new Date().toISOString()
      });
    }).catch(function (e) {
      if (e && (e.code === 'revoked' || e.code === 'not_granted')) { db = null; dbEstado = 'local'; }
    });
    return colas[lessonId];
  }

  /* Al arrancar: si hay db, fusiona lo remoto con lo local quedandose,
     comprobacion a comprobacion, con lo mas reciente. */
  function iniciarDb() {
    if (!window.claude || !claude.use) return Promise.resolve();
    dbEstado = 'probando';
    return claude.use('db').then(function (ns) {
      if (!ns) { dbEstado = 'local'; return; }
      db = ns;
      return db.collection('progreso').get().then(function (snap) {
        snap.docs.forEach(function (d) {
          var r = d.data() || {}, id = d.id, local = pl(id);
          if (r.done && !local.done) { local.done = true; local.doneTs = r.doneTs; }
          var rc = r.checks || {};
          Object.keys(rc).forEach(function (k) {
            var remoto = rc[k], actual = local.checks[k];
            if (!actual || (remoto && (remoto.ts || 0) > (actual.ts || 0))) local.checks[k] = remoto;
          });
        });
        dbEstado = 'nube';
        saveLocal();
      });
    }).catch(function () { dbEstado = 'local'; });
  }

  /* ---------- historial de respuestas ----------
     Guarda TODAS las respuestas, para poder ver despues donde hay lagunas.
     Es independiente del progreso: el boton de reiniciar NO lo borra. */
  var historial = [];
  try { historial = JSON.parse(localStorage.getItem('y11-historial')) || []; } catch (e) {}
  var colaHist = Promise.resolve();

  function anotarRespuesta(reg) {
    historial.push(reg);
    if (historial.length > 2000) historial = historial.slice(-2000);
    try { localStorage.setItem('y11-historial', JSON.stringify(historial)); } catch (e) {}
    if (!db) return;
    /* Un documento por leccion y dia: acotado, y facil de leer despues. */
    var docId = reg.leccion + '__' + new Date().toISOString().slice(0, 10);
    colaHist = colaHist.then(function () {
      return db.doc('respuestas/' + docId).get().then(function (snap) {
        var previo = (snap.exists && snap.data()) || {};
        var lista = (previo.intentos || []).concat([reg]).slice(-300);
        return db.doc('respuestas/' + docId).set({
          leccion: reg.leccion,
          fecha: docId.slice(-10),
          intentos: lista,
          total: lista.length,
          actualizado: new Date().toISOString()
        });
      });
    }).catch(function () {});
  }

  /* Borra el progreso de una leccion: en memoria, en localStorage y en la nube.
     El historial de respuestas se conserva a proposito. */
  function reiniciar(lessonId) {
    prog[lessonId] = { done: false, checks: {} };
    saveLocal();
    if (!db) return Promise.resolve();
    var previa = colas[lessonId] || Promise.resolve();
    colas[lessonId] = previa
      .then(function () { return db.doc('progreso/' + lessonId).delete(); })
      .catch(function () {});
    return colas[lessonId];
  }

  function checkIdsOf(id) {
    var t = tandaDe(id);
    return LESSONS[id].blocks.filter(function (b) {
      return b.t === 'check' && (b.banco || 'apuntes') === t;
    }).map(checkId);
  }
  function nChecks(id) { return checkIdsOf(id).length; }
  function nRight(id) {
    var c = pl(id).checks;
    return checkIdsOf(id).filter(function (k) { return c[k] && c[k].ok === true; }).length;
  }

  /* ---------- tema ---------- */
  try {
    var saved = localStorage.getItem('y11-tema');
    if (saved) document.documentElement.setAttribute('data-theme', saved);
  } catch (e) {}
  themeBtn.addEventListener('click', function () {
    var r = document.documentElement;
    var dark = r.getAttribute('data-theme') === 'dark' ||
      (!r.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
    var next = dark ? 'light' : 'dark';
    r.setAttribute('data-theme', next);
    try { localStorage.setItem('y11-tema', next); } catch (e) {}
    redrawPlots();
  });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', redrawPlots);

  function syncLangBtn() {
    langBtn.textContent = LANG === 'es' ? 'EN' : 'ES';
    langBtn.setAttribute('data-lang', LANG);
    langBtn.setAttribute('aria-label', LANG === 'es' ? 'Read in English' : 'Leer en español');
    document.documentElement.lang = LANG;
  }
  langBtn.addEventListener('click', function () {
    LANG = LANG === 'es' ? 'en' : 'es';
    try { localStorage.setItem('y11-idioma', LANG); } catch (e) {}
    syncLangBtn();
    route();
  });
  syncLangBtn();

  /* ---------- utilidades ---------- */
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function subjectOf(id) {
    for (var i = 0; i < SUBJECTS.length; i++) if (SUBJECTS[i].id === id) return SUBJECTS[i];
    return null;
  }
  function allLessons(sid) {
    var s = subjectOf(sid), out = [];
    if (!s) return out;
    s.units.forEach(function (u) { u.lessons.forEach(function (l) { out.push(l); }); });
    return out;
  }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  /* ---------- graficas ---------- */
  var plots = [];
  function cssVar(name) {
    return getComputedStyle(document.body).getPropertyValue(name).trim() || '#888';
  }
  function colorOf(name) {
    var map = { accent: '--accent', ok: '--ok', bad: '--bad', phys2: '--chem', ink: '--ink-2' };
    return cssVar(map[name] || '--accent');
  }
  function redrawPlots() { plots.forEach(function (p) { drawPlot(p.cv, p.spec); }); }
  window.addEventListener('resize', function () {
    clearTimeout(window.__rt);
    window.__rt = setTimeout(redrawPlots, 140);
  });

  function drawPlot(cv, s) {
    var host = cv.parentElement;
    var cssW = Math.max(260, host.clientWidth - 24);
    var cssH = s.h || 300;
    var dpr = window.devicePixelRatio || 1;
    cv.width = Math.round(cssW * dpr);
    cv.height = Math.round(cssH * dpr);
    cv.style.height = cssH + 'px';
    var c = cv.getContext('2d');
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.clearRect(0, 0, cssW, cssH);

    var ink = cssVar('--ink'), ink2 = cssVar('--ink-2'), ink3 = cssVar('--ink-3'),
      line = cssVar('--line'), line2 = cssVar('--line-2');
    var mono = '11px "IBM Plex Mono", monospace';

    var padL = 52, padR = 16, padT = 14, padB = 36;
    var W = cssW - padL - padR, H = cssH - padT - padB;
    var x0 = s.x[0], x1 = s.x[1], y0 = s.y[0], y1 = s.y[1];
    function X(v) { return padL + (v - x0) / (x1 - x0) * W; }
    function Y(v) { return padT + H - (v - y0) / (y1 - y0) * H; }

    c.lineWidth = 1;
    c.strokeStyle = line;
    c.font = mono;
    c.fillStyle = ink3;
    var i, v;
    var xs = s.xstep || (x1 - x0) / 6;
    var nx = Math.round((x1 - x0) / xs);
    var xskip = nx > 13 ? Math.ceil(nx / 10) : 1;
    for (i = 0; i <= nx; i++) {
      v = x0 + i * xs;
      c.beginPath(); c.moveTo(X(v), padT); c.lineTo(X(v), padT + H); c.stroke();
      if (i % xskip === 0) {
        c.textAlign = 'center'; c.textBaseline = 'top';
        c.fillText(fmt(v), X(v), padT + H + 7);
      }
    }
    var ys = s.ystep || (y1 - y0) / 5;
    var ny = Math.round((y1 - y0) / ys);
    var yskip = ny > 11 ? Math.ceil(ny / 8) : 1;
    for (i = 0; i <= ny; i++) {
      v = y0 + i * ys;
      c.beginPath(); c.moveTo(padL, Y(v)); c.lineTo(padL + W, Y(v)); c.stroke();
      if (i % yskip === 0) {
        c.textAlign = 'right'; c.textBaseline = 'middle';
        c.fillText(fmt(v), padL - 8, Y(v));
      }
    }

    if (s.fill) {
      c.beginPath();
      s.fill.pts.forEach(function (p, k) { k ? c.lineTo(X(p[0]), Y(p[1])) : c.moveTo(X(p[0]), Y(p[1])); });
      c.closePath();
      c.fillStyle = colorOf('accent');
      c.globalAlpha = 0.16;
      c.fill();
      c.globalAlpha = 1;
    }

    c.strokeStyle = line2;
    c.lineWidth = 1.4;
    var yAxis = (y0 <= 0 && y1 >= 0) ? Y(0) : padT + H;
    var xAxis = (x0 <= 0 && x1 >= 0) ? X(0) : padL;
    c.beginPath(); c.moveTo(padL, yAxis); c.lineTo(padL + W, yAxis); c.stroke();
    c.beginPath(); c.moveTo(xAxis, padT); c.lineTo(xAxis, padT + H); c.stroke();

    (s.series || []).forEach(function (se) {
      c.strokeStyle = colorOf(se.color);
      c.lineWidth = se.width || 2.4;
      c.lineJoin = 'round';
      c.lineCap = 'round';
      c.beginPath();
      if (se.type === 'fn') {
        var steps = 220, started = false;
        for (i = 0; i <= steps; i++) {
          var xv = x0 + (x1 - x0) * i / steps;
          var yv = se.f(xv);
          if (!isFinite(yv) || yv < y0 - (y1 - y0) || yv > y1 + (y1 - y0)) { started = false; continue; }
          started ? c.lineTo(X(xv), Y(yv)) : (c.moveTo(X(xv), Y(yv)), started = true);
        }
      } else {
        se.pts.forEach(function (p, k) { k ? c.lineTo(X(p[0]), Y(p[1])) : c.moveTo(X(p[0]), Y(p[1])); });
      }
      c.stroke();
    });

    (s.points || []).forEach(function (p) {
      c.fillStyle = colorOf('accent');
      c.beginPath(); c.arc(X(p.x), Y(p.y), 3.6, 0, 7); c.fill();
      var lab = T(p.label);
      if (lab) {
        c.fillStyle = ink;
        c.font = '600 11px "IBM Plex Mono", monospace';
        c.textAlign = X(p.x) > padL + W - 80 ? 'right' : 'left';
        c.textBaseline = 'bottom';
        c.fillText(lab, X(p.x) + (c.textAlign === 'right' ? -7 : 7), Y(p.y) - 6);
      }
    });
    if (s.fill && T(s.fill.label)) {
      c.fillStyle = ink2;
      c.font = mono;
      c.textAlign = 'center'; c.textBaseline = 'middle';
      c.fillText(T(s.fill.label), padL + W * 0.28, padT + H * 0.62);
    }

    c.fillStyle = ink2;
    c.font = '600 11px "IBM Plex Mono", monospace';
    c.textAlign = 'right'; c.textBaseline = 'bottom';
    c.fillText(s.xlabel || '', padL + W, cssH - 4);
    c.save();
    c.translate(13, padT + 2);
    c.textAlign = 'left'; c.textBaseline = 'top';
    c.fillText(s.ylabel || '', 0, 0);
    c.restore();
  }
  function fmt(v) {
    var r = Math.round(v * 1000) / 1000;
    return LANG === 'es' ? String(r).replace('.', ',') : String(r);
  }

  /* ---------- render de bloques ---------- */
  function renderBlocks(lessonId, wrap) {
    var L = LESSONS[lessonId];
    var secN = 0, checkN = -1, current = null;

    var tActiva = tandaDe(lessonId);

    L.blocks.forEach(function (b) {
      /* Un bloque marcado con banco solo aparece en su tanda. Los ejercicios sin
         marcar son los de los apuntes, que fue la primera tanda que existio. */
      var bancoDe = b.banco || (b.t === 'check' ? 'apuntes' : null);
      if (bancoDe && bancoDe !== tActiva) return;

      if (b.t === 'tandas') {
        current = null;
        wrap.appendChild(selectorTandas(lessonId));
        return;
      }
      if (b.t === 'h') {
        secN++;
        current = el('section', 'blk');
        var sub = T(b.sub);
        var h = el('h2', 'sec', esc(T(b.title)) + (sub ? ' <span class="en">' + esc(sub) + '</span>' : ''));
        h.setAttribute('data-n', String(secN).padStart(2, '0'));
        current.appendChild(h);
        wrap.appendChild(current);
        return;
      }
      var box = current || wrap;
      var n;

      switch (b.t) {
        case 'p':
          box.appendChild(el('p', 'tx', T(b.html)));
          break;
        case 'ul':
          n = el('ul', 'tx');
          T(b.items).forEach(function (it) { n.appendChild(el('li', null, T(it))); });
          box.appendChild(n);
          break;
        case 'key': case 'warn': case 'note':
          n = el('div', 'box ' + b.t);
          var fallback = { key: U('keyIdea'), warn: U('watchOut'), note: U('note') };
          n.appendChild(el('p', 'bt', T(b.title) || fallback[b.t]));
          n.appendChild(el('div', null, T(b.html)));
          box.appendChild(n);
          break;
        case 'fix':
          box.appendChild(fixBox(b));
          break;
        case 'svg':
          n = el('figure', 'dia');
          if (b.title) n.appendChild(el('p', 'dia-t', esc(T(b.title))));
          n.appendChild(el('div', 'svg-scroll', b.svg));
          if (b.cap) n.appendChild(el('figcaption', null, T(b.cap)));
          box.appendChild(n);
          break;
        case 'fx':
          n = el('div', 'fx');
          n.appendChild(el('div', null, '$$' + T(b.tex) + '$$'));
          if (b.cap) n.appendChild(el('div', 'cap', esc(T(b.cap))));
          box.appendChild(n);
          break;
        case 'vocab':
          n = el('div', 'vocab-wrap');
          var tb = '<table class="vocab"><thead><tr>';
          T(b.head).forEach(function (h2) { tb += '<th>' + esc(T(h2)) + '</th>'; });
          tb += '</tr></thead><tbody>';
          b.rows.forEach(function (r) {
            tb += '<tr>';
            T(r).forEach(function (cell) { tb += '<td>' + T(cell) + '</td>'; });
            tb += '</tr>';
          });
          n.innerHTML = tb + '</tbody></table>';
          box.appendChild(n);
          break;
        case 'plot':
          n = el('figure', 'plot');
          var cv = document.createElement('canvas');
          cv.setAttribute('role', 'img');
          cv.setAttribute('aria-label', esc(T(b.title) || 'gráfica'));
          n.appendChild(cv);
          if (b.series && b.series.some(function (x) { return x.label; })) {
            var lg = el('div', 'legend');
            b.series.forEach(function (se) {
              if (!se.label) return;
              lg.innerHTML += '<span><i style="background:' + colorOf(se.color) + '"></i>' + esc(T(se.label)) + '</span>';
            });
            n.appendChild(lg);
          }
          if (b.cap) n.appendChild(el('figcaption', null, esc(T(b.cap))));
          box.appendChild(n);
          plots.push({ cv: cv, spec: b });
          break;
        case 'ex':
          box.appendChild(worked(b, false));
          break;
        case 'guided':
          box.appendChild(worked(b, true));
          break;
        case 'check':
          checkN++;
          box.appendChild(check(b, lessonId, checkN));
          break;
      }
    });
  }

  /* Caja roja de error del cuaderno: lo que pone, por que esta mal, lo correcto. */
  function fixBox(b) {
    var n = el('div', 'fixbox');
    var hd = el('header');
    hd.innerHTML = '<span>&#9888; ' + U('fix') + '</span>' +
      (T(b.title) ? '<span class="sub">' + esc(T(b.title)) + '</span>' : '');
    n.appendChild(hd);

    var p1 = el('div', 'part');
    p1.appendChild(el('p', 'plabel', U('whatItSays')));
    p1.appendChild(el('div', 'wrong-line', T(b.wrong)));
    n.appendChild(p1);

    var p2 = el('div', 'part');
    p2.appendChild(el('p', 'plabel', U('whyWrong')));
    p2.appendChild(el('div', null, T(b.why)));
    n.appendChild(p2);

    var p3 = el('div', 'part good');
    p3.appendChild(el('p', 'plabel', U('whatIsRight')));
    p3.appendChild(el('div', 'right-line', T(b.right)));
    if (b.note) p3.appendChild(el('p', null, '<span style="font-size:14.5px">' + T(b.note) + '</span>'));
    n.appendChild(p3);

    if (b.tip) {
      var p4 = el('div', 'part tipp');
      p4.appendChild(el('p', 'plabel', U('howToAvoid')));
      p4.appendChild(el('div', null, T(b.tip)));
      n.appendChild(p4);
    }
    return n;
  }

  /* Botonera para elegir la tanda de ejercicios. */
  function selectorTandas(lessonId) {
    var n = el('div', 'tandas');
    n.appendChild(el('p', 'tandas-t', U('bankTitle')));
    var fila = el('div', 'tandas-row');
    var disponibles = tandasDe(lessonId);
    var activa = tandaDe(lessonId);
    disponibles.forEach(function (t) {
      var etiquetas = { apuntes: U('bankNotes'), nuevas1: U('bankNew1'), nuevas2: U('bankNew2') };
      var b = el('button', 'tanda-btn' + (t === activa ? ' on' : ''), etiquetas[t]);
      var hechas = LESSONS[lessonId].blocks.filter(function (x) {
        return x.t === 'check' && (x.banco || 'apuntes') === t;
      });
      var acertadas = hechas.filter(function (x) {
        var c = pl(lessonId).checks[checkId(x)];
        return c && c.ok === true;
      }).length;
      b.appendChild(el('span', 'tanda-n', acertadas + '/' + hechas.length));
      b.addEventListener('click', function () {
        if (t === tandaDe(lessonId)) return;
        ponerTanda(lessonId, t);
        viewLesson(lessonId);
      });
      fila.appendChild(b);
    });
    n.appendChild(fila);
    n.appendChild(el('p', 'tandas-hint', U('bankHint')));
    return n;
  }

  function worked(b, guided) {
    var n = el('article', 'work' + (guided ? ' guided' : ''));
    var hd = el('header');
    hd.appendChild(el('div', 'tag', guided ? U('guided') : U('worked')));
    hd.appendChild(el('h4', null, esc(T(b.title))));
    n.appendChild(hd);

    var st = el('div', 'stmt');
    st.appendChild(el('p', null, T(b.stmt)));
    if (b.given) {
      var g = el('div', 'given');
      T(b.given).forEach(function (x) { g.appendChild(el('span', null, esc(T(x)))); });
      st.appendChild(g);
    }
    n.appendChild(st);

    var ol = el('ol', 'steps');
    b.steps.forEach(function (s) {
      var li = el('li');
      if (guided) {
        li.appendChild(el('p', 'ask', esc(T(s.ask))));
        var btn = el('button', 'reveal', U('showStep'));
        var hidden = el('div', 'hidden-step');
        hidden.hidden = true;
        if (s.hint) hidden.appendChild(el('p', 'why', '<strong>' + U('hint') + ':</strong> ' + T(s.hint)));
        hidden.appendChild(el('div', 'mline', T(s.sol)));
        btn.addEventListener('click', function () {
          hidden.hidden = !hidden.hidden;
          btn.textContent = hidden.hidden ? U('showStep') : U('hideStep');
        });
        li.appendChild(btn);
        li.appendChild(hidden);
      } else {
        li.appendChild(el('div', 'mline', T(s.do)));
        if (s.why) li.appendChild(el('p', 'why', T(s.why)));
      }
      ol.appendChild(li);
    });
    n.appendChild(ol);

    if (b.result) {
      var r = el('div', 'result');
      r.appendChild(el('span', 'lbl', U('answer')));
      r.appendChild(el('span', null, T(b.result)));
      n.appendChild(r);
    }
    return n;
  }

  function check(b, lessonId, idx) {
    var n = el('div', 'check');
    var cid = checkId(b);
    var prev = pl(lessonId).checks[cid];
    n.setAttribute('data-mode', b.mode || 'drill');
    n.appendChild(el('p', 'bt',
      '<span class="mode-tag">' + (b.mode === 'concept' ? U('concept') : U('drill')) + '</span>' +
      '<span>' + (b.kind === 'num' ? U('numeric') : U('pickOne')) + '</span>'));
    n.appendChild(el('p', 'q', T(b.q)));
    var fb = el('div', 'fb');
    fb.hidden = true;

    /* Registra el intento: acierto, respuesta dada y cuantas veces lo ha intentado.
       Eso es lo que me deja ver despues en que tipo de pregunta falla. */
    function settle(ok, respuesta) {
      var c = pl(lessonId).checks[cid] || { aciertos: 0, fallos: 0, intentos: [] };
      c.ok = ok;
      c.mode = b.mode || 'drill';
      c.tipo = b.kind;
      c.pregunta = String((b.q && b.q.es) || b.q || '').replace(/<[^>]*>/g, '').slice(0, 160);
      c.aciertos = (c.aciertos || 0) + (ok ? 1 : 0);
      c.fallos = (c.fallos || 0) + (ok ? 0 : 1);
      if (c.aLaPrimera === undefined) c.aLaPrimera = ok;
      c.intentos = (c.intentos || []).concat([{ ok: ok, resp: respuesta, ts: Date.now() }]).slice(-12);
      c.ts = Date.now();
      pl(lessonId).checks[cid] = c;
      guardar(lessonId);
      anotarRespuesta({
        leccion: lessonId,
        check: cid,
        tanda: b.banco || 'apuntes',
        modo: b.mode || 'drill',
        tipo: b.kind,
        pregunta: c.pregunta,
        respuesta: respuesta,
        correcta: ok,
        intento: (c.aciertos || 0) + (c.fallos || 0),
        ts: new Date().toISOString()
      });
      fb.hidden = false;
      fb.className = 'fb ' + (ok ? 'ok' : 'no');
      fb.innerHTML = '<b>' + (ok ? U('correct') : U('incorrect')) + '</b> ' + T(b.explain);
      typeset(fb);
      updateScore(lessonId);
    }

    if (b.kind === 'mc') {
      var opts = el('div', 'opts');
      T(b.options).forEach(function (o, i) {
        var btn = el('button', 'opt');
        btn.innerHTML = '<span class="k">' + 'ABCD'[i] + '</span><span>' + T(o) + '</span>';
        btn.addEventListener('click', function () {
          Array.prototype.forEach.call(opts.children, function (c, j) {
            c.disabled = true;
            if (j === b.answer) c.classList.add('right');
            else if (j === i) c.classList.add('wrong');
          });
          settle(i === b.answer, 'ABCD'[i] + ': ' + String(T(o)).replace(/<[^>]*>/g, '').slice(0, 80));
        });
        opts.appendChild(btn);
      });
      n.appendChild(opts);
    } else {
      var row = el('div', 'numrow');
      var inp = document.createElement('input');
      inp.type = 'text';
      inp.inputMode = 'decimal';
      inp.placeholder = U('yourAnswer');
      inp.id = 'in-' + lessonId + '-' + idx;
      var btn2 = el('button', 'btn', U('checkBtn'));
      var go = function () {
        var raw = inp.value.replace(',', '.').trim();
        if (raw === '') return;
        var val = parseFloat(raw);
        settle(isFinite(val) && Math.abs(val - b.answer) <= (b.tol || 0.01), inp.value.trim());
      };
      btn2.addEventListener('click', go);
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') go(); });
      row.appendChild(inp);
      if (b.unit) row.appendChild(el('span', 'unit', b.unit));
      row.appendChild(btn2);
      n.appendChild(row);
    }
    n.appendChild(fb);
    if (prev && prev.ok === true) {
      fb.hidden = false;
      fb.className = 'fb ok';
      fb.innerHTML = '<b>' + U('already') + '</b> ' + T(b.explain);
    }
    return n;
  }

  function pintarSync(n) {
    if (!n) return;
    n.textContent = dbEstado === 'nube' ? U('syncCloud')
      : dbEstado === 'probando' ? U('syncChecking') : U('syncLocal');
    n.setAttribute('data-estado', dbEstado);
  }

  function updateScore(lessonId) {
    var s = document.getElementById('score');
    if (s) s.textContent = nRight(lessonId) + ' / ' + nChecks(lessonId) + ' ' + U('checksLabel');
  }

  function typeset(node) {
    if (window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([node]).catch(function () {});
  }

  /* ---------- vistas ---------- */
  function viewHome() {
    document.body.removeAttribute('data-subject');
    var w = el('div', 'wrap');
    var hero = el('div', 'hero');
    hero.appendChild(el('p', 'eyebrow', U('heroEyebrow')));
    hero.appendChild(el('h1', null, U('heroTitle')));
    hero.appendChild(el('p', null, U('heroText')));
    w.appendChild(hero);

    var grid = el('div', 'subject-grid');
    SUBJECTS.forEach(function (s) {
      var ls = allLessons(s.id);
      var done = ls.filter(function (id) { return prog[id] && prog[id].done; }).length;
      var a = el('a', 'subject-card');
      a.href = '#/' + s.id;
      a.setAttribute('data-subject', s.id);
      a.innerHTML = '<div class="en">' + esc(LANG === 'es' ? s.en : s.name) + '</div><h3>' +
        esc(T(s.name2) || (LANG === 'es' ? s.name : s.en)) + '</h3><p>' + esc(T(s.blurb)) + '</p>';
      if (ls.length) {
        var bar = el('div', 'bar');
        bar.innerHTML = '<i style="width:' + Math.round(done / ls.length * 100) + '%"></i>';
        a.appendChild(bar);
        a.appendChild(el('div', 'bar-label', '<span>' + ls.length + ' ' + U('lessons') +
          '</span><span>' + done + ' ' + U('revised') + '</span>'));
      } else {
        a.appendChild(el('div', 'bar-label', '<span>' + U('noLessons') + '</span><span>' + U('sendPhotos') + '</span>'));
      }
      grid.appendChild(a);
    });
    w.appendChild(grid);

    /* Reiniciar todo el progreso, con confirmacion en dos pasos. */
    var zona = el('div', 'reset-row');
    zona.style.marginTop = '26px';
    var todo = el('button', 'btn ghost', U('resetAll'));
    var confirmando = false, temporizador;
    todo.addEventListener('click', function () {
      if (!confirmando) {
        confirmando = true;
        todo.className = 'btn danger';
        todo.textContent = U('resetAllOk');
        zona.appendChild(el('span', 'reset-msg', U('resetAllWarn')));
        temporizador = setTimeout(function () {
          confirmando = false;
          todo.className = 'btn ghost';
          todo.textContent = U('resetAll');
          if (zona.lastChild !== todo) zona.removeChild(zona.lastChild);
        }, 6000);
        return;
      }
      clearTimeout(temporizador);
      var pendientes = Object.keys(LESSONS).map(reiniciar);
      Promise.all(pendientes).then(function () { viewHome(); });
    });
    zona.appendChild(todo);
    w.appendChild(zona);

    main.innerHTML = '';
    plots = [];
    main.appendChild(w);
    sidebar.innerHTML = '';
    typeset(main);
  }

  function viewSubject(sid) {
    var s = subjectOf(sid);
    if (!s) return viewHome();
    document.body.setAttribute('data-subject', sid);
    var ls = allLessons(sid);
    if (ls.length) { location.hash = '#/l/' + ls[0]; return; }

    var w = el('div', 'wrap');
    w.appendChild(el('p', 'eyebrow', esc(LANG === 'es' ? s.en : s.name)));
    w.appendChild(el('h1', null, esc(LANG === 'es' ? s.name : s.en)));
    var soon = el('div', 'soon-card');
    soon.style.marginTop = '22px';
    soon.innerHTML = '<h3>' + U('emptyTitle') + '</h3><p>' + U('emptyText') + '</p>';
    w.appendChild(soon);
    main.innerHTML = '';
    plots = [];
    main.appendChild(w);
    renderSidebar(sid, null);
  }

  function viewLesson(id) {
    var L = LESSONS[id];
    if (!L) return viewHome();
    document.body.setAttribute('data-subject', L.subject);
    var s = subjectOf(L.subject);
    var ls = allLessons(L.subject);
    var i = ls.indexOf(id);

    var w = el('div', 'wrap');
    var crumb = el('div', 'crumb');
    crumb.innerHTML = '<a href="#/">' + U('home') + '</a> › <a href="#/' + L.subject + '">' +
      esc(LANG === 'es' ? s.name : s.en) + '</a> › <span>' + U('lesson') + ' ' + (i + 1) + '</span>';
    w.appendChild(crumb);

    var hd = el('div', 'lesson-head');
    hd.appendChild(el('h1', null, esc(T(L.title))));
    hd.appendChild(el('p', 'en-title', esc(LANG === 'es' ? T(L.en) : T(L.title).toString())));
    hd.appendChild(el('p', 'lede', esc(T(L.lede))));
    w.appendChild(hd);

    plots = [];
    renderBlocks(id, w);

    var foot = el('div', 'lesson-foot');
    var b = el('button', 'btn' + (pl(id).done ? ' ghost' : ''), pl(id).done ? U('markedDone') : U('markDone'));
    b.addEventListener('click', function () {
      pl(id).done = !pl(id).done;
      pl(id).doneTs = pl(id).done ? Date.now() : null;
      guardar(id);
      b.textContent = pl(id).done ? U('markedDone') : U('markDone');
      b.className = 'btn' + (pl(id).done ? ' ghost' : '');
      renderSidebar(L.subject, id);
    });
    foot.appendChild(b);
    var sc = el('span', 'score');
    sc.id = 'score';
    sc.textContent = nRight(id) + ' / ' + nChecks(id) + ' ' + U('checksLabel');
    foot.appendChild(sc);
    var fila = el('div', 'reset-row');
    var rst = el('button', 'btn ghost', U('resetLesson'));
    var confirmando = false, temporizador;
    rst.addEventListener('click', function () {
      if (!confirmando) {
        confirmando = true;
        rst.className = 'btn danger';
        rst.textContent = U('resetConfirm');
        fila.appendChild(el('span', 'reset-msg', U('resetWarn')));
        temporizador = setTimeout(function () {
          confirmando = false;
          rst.className = 'btn ghost';
          rst.textContent = U('resetLesson');
          if (fila.lastChild !== rst) fila.removeChild(fila.lastChild);
        }, 6000);
        return;
      }
      clearTimeout(temporizador);
      reiniciar(id);
      viewLesson(id);
    });
    fila.appendChild(rst);
    foot.appendChild(fila);

    var sy = el('span', 'sync');
    sy.id = 'sync';
    pintarSync(sy);
    foot.appendChild(sy);
    w.appendChild(foot);

    var np = el('div', 'navpair');
    if (i > 0) np.innerHTML += '<a href="#/l/' + ls[i - 1] + '"><span class="d">' + U('prev') +
      '</span><span class="t">' + esc(T(LESSONS[ls[i - 1]].title)) + '</span></a>';
    if (i < ls.length - 1) np.innerHTML += '<a href="#/l/' + ls[i + 1] + '"><span class="d">' + U('next') +
      '</span><span class="t">' + esc(T(LESSONS[ls[i + 1]].title)) + '</span></a>';
    if (np.children.length) w.appendChild(np);

    main.innerHTML = '';
    main.appendChild(w);
    renderSidebar(L.subject, id);
    redrawPlots();
    typeset(main);
  }

  function renderSidebar(sid, activeId) {
    var s = subjectOf(sid);
    sidebar.innerHTML = '';
    if (!s) return;
    s.units.forEach(function (u) {
      var g = el('div', 'side-group');
      g.appendChild(el('p', null, esc(T(u.name))));
      u.lessons.forEach(function (lid, k) {
        var a = el('a', 'side-link' + (prog[lid] && prog[lid].done ? ' done' : ''));
        a.href = '#/l/' + lid;
        a.innerHTML = '<span class="n">' + String(k + 1).padStart(2, '0') + '</span><span>' +
          esc(T(LESSONS[lid].title)) + '</span>';
        if (lid === activeId) a.setAttribute('aria-current', 'page');
        g.appendChild(a);
      });
      sidebar.appendChild(g);
    });
    var note = el('div', 'side-group');
    note.innerHTML = '<p>' + U('upcoming') + '</p><a class="side-link soon"><span class="n">··</span><span>' +
      U('moreSoon') + '</span></a>';
    sidebar.appendChild(note);
  }

  function renderTabs(active) {
    tabs.innerHTML = '';
    SUBJECTS.forEach(function (s) {
      var a = el('a', null, esc(LANG === 'es' ? s.name : s.en));
      a.href = '#/' + s.id;
      if (s.id === active) a.setAttribute('aria-current', 'page');
      tabs.appendChild(a);
    });
  }

  /* ---------- puerta de entrada ----------
     Comprueba la huella del nombre, no el nombre en claro: asi no aparece
     escrito en el codigo. No es seguridad de verdad (quien lea este archivo
     puede darle la vuelta), solo evita que alguien entre de paso y conteste. */
  var HUELLA = 'co7zurs';
  var LLAVE_ENTRADA = 'y11-entrada';

  function normaliza(txt) {
    return String(txt)
      .toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')   // quita tildes
      .replace(/[^a-z0-9]/g, '');                          // quita espacios y signos
  }
  function esValido(txt) { return hashId(normaliza(txt)) === HUELLA; }

  function yaEntro() {
    try { return localStorage.getItem(LLAVE_ENTRADA) === HUELLA; } catch (e) { return false; }
  }
  function recordarEntrada() {
    try { localStorage.setItem(LLAVE_ENTRADA, HUELLA); } catch (e) {}
  }

  function pedirNombre() {
    document.body.classList.add('bloqueado');
    var capa = el('div', 'puerta');
    var caja = el('form', 'puerta-caja');
    caja.innerHTML =
      '<div class="puerta-mark">Y11</div>' +
      '<h1>' + U('gateTitle') + '</h1>' +
      '<p>' + U('gateText') + '</p>';
    var campo = document.createElement('input');
    campo.type = 'text';
    campo.id = 'gate-name';
    campo.placeholder = U('gatePlaceholder');
    campo.autocomplete = 'off';
    campo.setAttribute('autocapitalize', 'none');
    campo.setAttribute('spellcheck', 'false');
    campo.setAttribute('aria-label', U('gatePlaceholder'));
    var boton = el('button', 'btn', U('gateBtn'));
    boton.type = 'submit';
    var error = el('p', 'puerta-error');
    error.hidden = true;
    error.textContent = U('gateError');

    caja.appendChild(campo);
    caja.appendChild(boton);
    caja.appendChild(error);
    caja.addEventListener('submit', function (e) {
      e.preventDefault();
      if (esValido(campo.value)) {
        recordarEntrada();
        capa.remove();
        document.body.classList.remove('bloqueado');
        route();
      } else {
        error.hidden = false;
        campo.value = '';
        campo.focus();
        caja.classList.remove('tiembla');
        void caja.offsetWidth;
        caja.classList.add('tiembla');
      }
    });
    capa.appendChild(caja);
    document.body.appendChild(capa);
    setTimeout(function () { campo.focus(); }, 60);
  }

  /* ---------- router ---------- */
  function route() {
    sidebar.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    if (typeof scrim !== 'undefined' && scrim) { scrim.remove(); scrim = null; }
    var h = location.hash.replace(/^#\/?/, '');
    var parts = h.split('/').filter(Boolean);
    if (!parts.length) { renderTabs(null); return viewHome(); }
    if (parts[0] === 'l' && parts[1]) {
      var L = LESSONS[parts[1]];
      renderTabs(L ? L.subject : null);
      return viewLesson(parts[1]);
    }
    renderTabs(parts[0]);
    return viewSubject(parts[0]);
  }
  window.addEventListener('hashchange', function () { route(); window.scrollTo(0, 0); });

  var scrim = null;
  function cerrarMenu() {
    sidebar.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    if (scrim) { scrim.remove(); scrim = null; }
  }
  menuBtn.addEventListener('click', function () {
    var open = sidebar.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
    if (open) {
      scrim = el('button', 'scrim');
      scrim.setAttribute('aria-label', LANG === 'es' ? 'Cerrar el índice' : 'Close the index');
      scrim.addEventListener('click', cerrarMenu);
      document.body.appendChild(scrim);
    } else { cerrarMenu(); }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') cerrarMenu(); });

  /* Arranca cuando MathJax este listo; la db se consulta en paralelo y,
     si contesta despues, se repinta la vista con el progreso ya fusionado. */
  iniciarDb().then(function () {
    pintarSync(document.getElementById('sync'));
    if (dbEstado === 'nube' && yaEntro()) route();
  });

  /* Nada se pinta hasta pasar la puerta. */
  function arrancar() {
    if (yaEntro()) route();
    else pedirNombre();
  }

  if (window.MathJax && MathJax.startup && MathJax.startup.promise) {
    MathJax.startup.promise.then(arrancar);
  } else {
    arrancar();
    var tries = 0;
    var iv = setInterval(function () {
      if (window.MathJax && MathJax.typesetPromise) { clearInterval(iv); typeset(main); }
      if (++tries > 60) clearInterval(iv);
    }, 250);
  }
})();
