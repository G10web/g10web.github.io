"""Verifica TODOS los numeros de las tandas nuevas de ejercicios.

Cada entrada dice: enunciado, como se resuelve, y el valor que se publicara.
Si algo no cuadra, el script lo marca MAL y esa pregunta no se publica.
"""
from math import sqrt

fallos = []

def chk(nombre, calc, publicado, tol=0.02):
    ok = abs(calc - publicado) <= tol
    if not ok:
        fallos.append(nombre)
    print(f"{'OK ' if ok else 'MAL'} | {nombre:<58} calc={calc:>10.4f}  publicado={publicado}")

print("=" * 90)
print("CINEMATICA BASICA - tanda nueva 1")
print("=" * 90)
# 1. Tren: 2,4 km en 3 minutos
chk("Tren 2400 m / 180 s", 2400 / 180, 13.33, tol=0.01)
# 2. Nadador: 50 m ida + 50 m vuelta en 80 s -> velocidad media
chk("Nadador ida y vuelta: desplazamiento 0", 0 / 80, 0)
chk("Nadador: rapidez media 100/80", 100 / 80, 1.25)
# 3. Caminante: 40 m norte, 30 m sur, en 25 s
chk("Caminante: dx = 40 - 30", 40 - 30, 10)
chk("Caminante: v = 10/25", 10 / 25, 0.4)
chk("Caminante: distancia 40+30", 40 + 30, 70)
# 4. Posicion inicial -8 m, final +12 m
chk("dx = 12 - (-8)", 12 - (-8), 20)
# 5. 72 km/h a m/s
chk("72 km/h -> m/s", 72 * 1000 / 3600, 20)

print()
print("=" * 90)
print("CINEMATICA BASICA - tanda nueva 2")
print("=" * 90)
# 1. Ciclista 15 m/s durante 4 minutos
chk("Ciclista: dx = 15 * 240", 15 * 240, 3600)
# 2. Coche -25 m/s durante 8 s
chk("Coche hacia atras: dx = -25*8", -25 * 8, -200)
# 3. Vuelta a manzana 120x80 en 150 s
per = 2 * 120 + 2 * 80
chk("Manzana: perimetro", per, 400)
chk("Manzana: rapidez 400/150", per / 150, 2.67, tol=0.01)
# 4. Autobus: 3 km en 10 min, luego 2 km de vuelta en 5 min
chk("Autobus: dx = 3000 - 2000", 3000 - 2000, 1000)
chk("Autobus: t total = 900 s", 600 + 300, 900)
chk("Autobus: v media = 1000/900", 1000 / 900, 1.11, tol=0.01)
chk("Autobus: rapidez = 5000/900", 5000 / 900, 5.56, tol=0.01)

print()
print("=" * 90)
print("GRAFICAS - tanda nueva 1")
print("=" * 90)
# Pendientes de una x-t
chk("De (1,2) a (5,10): v", (10 - 2) / (5 - 1), 2)
chk("De (0,6) a (4,-2): v", (-2 - 6) / (4 - 0), -2)
chk("De (2,5) a (7,5): v", (5 - 5) / (7 - 2), 0)
# Areas de una v-t
chk("Rectangulo 4 m/s x 6 s", 4 * 6, 24)
chk("Triangulo base 5 s altura 10 m/s", 0.5 * 5 * 10, 25)
chk("Trapecio: (3+7)/2 * 4", (3 + 7) / 2 * 4, 20)

print()
print("=" * 90)
print("GRAFICAS - tanda nueva 2")
print("=" * 90)
# v-t con tramo positivo y negativo
a1 = 5 * 4      # +20
a2 = -3 * 6     # -18
chk("Tramo 1: +5 m/s x 4 s", a1, 20)
chk("Tramo 2: -3 m/s x 6 s", a2, -18)
chk("Desplazamiento total", a1 + a2, 2)
chk("Distancia total", abs(a1) + abs(a2), 38)
# pendiente de una v-t = aceleracion
chk("v-t de 4 a 16 m/s en 3 s -> a", (16 - 4) / 3, 4)

print()
print("=" * 90)
print("ACELERACION - tanda nueva 1")
print("=" * 90)
# 1. Avion despega: 0 -> 80 m/s en 20 s
chk("Avion: a = 80/20", 80 / 20, 4)
chk("Avion: dx = 0.5*4*400", 0.5 * 4 * 400, 800)
chk("Avion: cruzado (80^2-0)/(2*4)", (80**2) / (2 * 4), 800)
# 2. Ciclista frena de 12 a 0 en 4 s
chk("Ciclista: a = (0-12)/4", (0 - 12) / 4, -3)
chk("Ciclista: dx = 12*4 + 0.5*(-3)*16", 12 * 4 + 0.5 * (-3) * 16, 24)
chk("Ciclista: cruzado -144/(2*-3)", -(12**2) / (2 * -3), 24)
# 3. Piedra cae 2 s (g = 9,8)
chk("Piedra: v = 9.8*2", 9.8 * 2, 19.6)
chk("Piedra: dx = 0.5*9.8*4", 0.5 * 9.8 * 4, 19.6)
# 4. Coche 30 m/s frena en 75 m
chk("Coche: a = -900/150", (0 - 30**2) / (2 * 75), -6)

print()
print("=" * 90)
print("ACELERACION - tanda nueva 2")
print("=" * 90)
# 1. Moto de 10 a 30 m/s con a = 2,5
chk("Moto: t = 20/2.5", (30 - 10) / 2.5, 8)
chk("Moto: dx = 10*8 + 0.5*2.5*64", 10 * 8 + 0.5 * 2.5 * 64, 160)
chk("Moto: cruzado (900-100)/(2*2.5)", (30**2 - 10**2) / (2 * 2.5), 160)
# 2. Pelota hacia arriba a 20 m/s, a = -10
chk("Pelota: t de subida = 20/10", 20 / 10, 2)
chk("Pelota: altura = 20*2 - 0.5*10*4", 20 * 2 - 0.5 * 10 * 4, 20)
chk("Pelota: tiempo total ida y vuelta", 2 + 2, 4)
chk("Pelota: v al volver", -20, -20)
# 3. Tren 20 m/s, a = -0,5, cuanto tarda en pararse
chk("Tren: t = -20/-0.5", (0 - 20) / -0.5, 40)
chk("Tren: dx = 20*40 - 0.5*0.5*1600", 20 * 40 - 0.5 * 0.5 * 1600, 400)
# 4. Duplicar velocidad, distancia de frenado x4
d1 = 20**2 / (2 * 5)
d2 = 40**2 / (2 * 5)
chk("Frenado a 20 m/s (a=-5)", d1, 40)
chk("Frenado a 40 m/s (a=-5)", d2, 160)
chk("Razon d2/d1", d2 / d1, 4)

print()
print("=" * 90)
if fallos:
    print(f"HAY {len(fallos)} FALLOS -> no publicar esas preguntas:")
    for f in fallos:
        print("   -", f)
else:
    print("TODAS LAS PREGUNTAS NUEVAS VERIFICADAS: los numeros publicados son correctos.")
print("=" * 90)
