"""Pone una marca de version nueva en los <script src> de index.html.

Sin esto, el navegador (y sobre todo Safari en el iPhone) reutiliza los .js
que ya tiene guardados y la web parece no actualizarse nunca.

Se ejecuta ANTES de publicar, cada vez que cambie algun .js:
    python verificacion/marcar_version.py
"""
import io, re, sys, datetime

RUTA = 'index.html'
ARCHIVOS = ['data.js', 'fisica.js', 'mates.js', 'app.js']

s = io.open(RUTA, encoding='utf-8').read()
version = datetime.datetime.now().strftime('%Y%m%d%H%M')

cambios = 0
for nombre in ARCHIVOS:
    # con marca previa o sin ella
    patron = re.compile(r'(<script src=")' + re.escape(nombre) + r'(\?v=\d+)?(")')
    s, n = patron.subn(lambda m: m.group(1) + nombre + '?v=' + version + m.group(3), s)
    cambios += n

io.open(RUTA, 'w', encoding='utf-8', newline='\n').write(s)

print(f'Version {version} marcada en {cambios} scripts.')
if cambios == 0:
    print('AVISO: no se encontro ningun <script src> conocido. Revisa index.html.')
    sys.exit(1)
for linea in s.split('\n'):
    if '<script src="' in linea and 'cdnjs' not in linea:
        print('  ' + linea.strip())
