#!/bin/python3
from datetime import date, timedelta

fecha_publicacion = date.today()
intervalo = 1
repeticion = 6
veces_publicado = 1

print('primer publicacion: ', fecha_publicacion)
resta_publicar = repeticion - veces_publicado
# el while no va en script para el sistema se reemplaza con un crontab
while True: 
	if resta_publicar > 0:
		delta = timedelta(days=intervalo)
		fecha_publicacion = fecha_publicacion + delta
		print('nueva publicacion:  ', fecha_publicacion)
		veces_publicado += 1
		resta_publicar = repeticion - veces_publicado
	else:
		print('se completó la publicación')
		break
