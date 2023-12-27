f = open("/home/kasimxo/AdventOfCode/Inputs/KaS-AOC-Inputs/2023/D3","r")

def comprobar(indice, longitud, indiceLinea, lista):
	#Iterate over three lines: above number, same as number, below number
	#Deberíamos comprobar que las líneas por encima y por debajo sean válidas
	#Lo mismo con los chars
	minRango = indiceLinea
	maxRango = indiceLinea
	
	indiceMin = indice
	
	if(indice>0):
		indiceMin -= 1
	if(indiceMin>0):
		indiceMin -= 1
	if(indiceLinea>0): 
		minRango = indiceLinea - 1
	if(indiceLinea<len(lista)):
		maxRango = indiceLinea + 1
	indiceLineaAct = minRango
	indiceCharAct = indiceMin
	for linea in lista[minRango:maxRango+1]:
		for char in linea[indiceMin:indice+longitud]:
			if(char == '*'):
				return str(indiceLineaAct) + " " + str(indiceCharAct)
			indiceCharAct += 1
		indiceCharAct = indiceMin
		indiceLineaAct += 1
	return ""

def actualizarDic(dicGears, coord, Number):
	if coord in dicGears.keys():
		val = dicGears[coord]
		dicGears[coord] = Number * val, True
	else:
		dicGears[coord] = Number
	return dicGears









line = f.readline()
lista = list()

dicGears = {}

sumParts = 0

while line:
	
	lista.append(line)
	line = f.readline()

#Iterate over every line in file
for l in lista:
	#iterate over every char in line
	numberL = 0
	indexN = 0
	indexCurr = 0
	partNumber = False
	Number = 0
	for char in l:
		indexCurr += 1
		if(char.isnumeric()):
			#We check number length
			numberL += 1
			if(Number==0): 
				Number = int(char)
			else:
				Number = Number * 10 + int(char)
			if(indexN == 0): indexN = indexCurr
			#partNumber = comprobar(indexN, numberL, lista.index(l), lista)
		elif(Number!=0):
			coord = comprobar(indexN, numberL, lista.index(l), lista)
			if(len(coord)>0):
				print(coord)
				dicGears = actualizarDic(dicGears, coord, Number)
			numberL = 0
			indexN = 0
			
			Number = 0
		
for v in dicGears.values():
	try:
		if len(v)>1:
			print(v[0])
			sumParts += v[0]
	except:
		pass
print("\n", sumParts)


