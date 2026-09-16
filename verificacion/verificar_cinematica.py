"""Verificacion de todos los numeros de los apuntes de Cinematica y Aceleracion."""
from math import sqrt

def chk(nombre, calc, apunte, tol=0.05):
    ok = abs(calc - apunte) <= tol
    print(f"{'OK ' if ok else 'MAL'} | {nombre:<52} calc={calc:>10.4f}  apunte={apunte}")
    return ok

print("=== FOTO 1: Kinematics ===")
# Bob va a McDonald's: 1200 m en 10 min
chk("Bob ida: v = 1200/600", 1200/600, 2)
# Vuelta corriendo a 6 m/s, desplazamiento -1200 m
chk("Bob vuelta: t = 1200/6", 1200/6, 200)
# Viaje completo
d_total = 1200 + 1200
t_total = 600 + 200
chk("Viaje completo: rapidez media = 2400/800", d_total/t_total, 3.0)
chk("Viaje completo: velocidad media = 0/800", 0/t_total, 0.0)
# Campo de futbol 105 x 68, una vuelta en 90 s
per = 2*105 + 2*68
chk("Perimetro campo 2(105)+2(68)", per, 346)
chk("Rapidez media = 346/90", per/90, 3.84, tol=0.01)
chk("Velocidad media (vuelve al inicio)", 0.0, 0.0)
# Pendientes del grafico x-t
chk("Pendiente tramo 1 = 4/3", 4/3, 1.33, tol=0.01)
chk("Pendiente tramo 2 = 4/1", 4/1, 4)
chk("Pendiente tramo 3 = -2/2", -2/2, -1)

print()
print("=== FOTO 2: grafica x-t -> v-t y experimento ===")
# Tramos leidos del grafico: A sube 0->2 m en 2 s, B llano, C baja, D, E, F
tramos = [("A  0->2 m en 2 s", (2-0)/2, 1.0),
          ("B  2->2 m en 2 s", (2-2)/2, 0.0),
          ("C  2->0 m en 2 s", (0-2)/2, -1.0),
          ("D  0->-1 m en 1 s", (-1-0)/1, -1.0),
          ("E -1->-1 m en 2 s", (-1+1)/2, 0.0)]
for n, v, esp in tramos:
    chk(f"v tramo {n}", v, esp)
# Experimento 1
chk("Experimento: a = 0.91/0.95", 0.91/0.95, 0.96, tol=0.01)
chk("Experimento (tachado): v = 0.22/0.5", 0.22/0.5, 0.44)

print()
print("=== FOTO 3: ACCELERATION ===")
# Maria frena
vi, a, vf = 15, -5, 0
t = (vf - vi)/a
chk("Maria frena: t = (0-15)/(-5)", t, 3)
dx = vi*t + 0.5*a*t**2
chk("Maria frena: dx = 15(3)+0.5(-5)(9)", dx, 22.5)
# Comprobacion cruzada con la 'timeless'
chk("  cruzado: dx = -vi^2/(2a)", -vi**2/(2*a), 22.5)
# Coche que arranca
vi2, vf2, t2 = 0, 25, 8
a2 = (vf2-vi2)/t2
chk("Coche: a = 25/8", a2, 3.125)
dx2 = vi2*t2 + 0.5*a2*t2**2
chk("Coche: dx = 0(8)+0.5(3.125)(64)", dx2, 100)
chk("  cruzado: dx = (vf^2-vi^2)/(2a)", (vf2**2-vi2**2)/(2*a2), 100)

print()
print("=== FOTO 4 ===")
# Coche que frena de 25 a 15 con a = -1.5
vi3, vf3, a3 = 25, 15, -1.5
t3 = (vf3-vi3)/a3
chk("t = (15-25)/(-1.5)", t3, 6.7, tol=0.05)
dx3 = vi3*t3 + 0.5*a3*t3**2
chk("dx = 25t + 0.5(-1.5)t^2  [t exacto]", dx3, 133, tol=0.6)
dx3b = vi3*6.7 + 0.5*a3*6.7**2
chk("dx con t redondeado a 6.7", dx3b, 133, tol=0.6)
chk("  cruzado: dx = (vf^2-vi^2)/(2a)", (vf3**2-vi3**2)/(2*a3), 133, tol=0.6)
chk("Total recorrido: 133 + 100", 133+100, 233)
# Maria en la rampa
vi4, a4, t4 = 10, -5, 2
chk("Rampa: t hasta parar = -10/-5", -vi4/a4, 2)
dx4 = vi4*t4 + 0.5*a4*t4**2
chk("Rampa: dx = 10(2)+0.5(-5)(4)", dx4, 10)
# Bajada: parte del reposo desde 10 m arriba
dx5, a5 = -10, -5
t5 = sqrt(2*dx5/a5)
chk("Rampa bajada: t = sqrt(2(-10)/(-5))", t5, 2)
chk("Rampa: tiempo total ida+vuelta", t4+t5, 4)
# Coche con vi = -10 m/s y dx = 42 m  -> el apunte lo marca "not possible"
print()
print("Caso vi = -10 m/s, dx = +42 m (marcado 'not possible' en el apunte):")
print("  con dos incognitas (a y t) y una sola ecuacion NO se puede resolver -> correcto.")
