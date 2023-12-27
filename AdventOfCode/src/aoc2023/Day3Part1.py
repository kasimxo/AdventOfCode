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
	check = False
	if(indiceLinea>0): 
		minRango = indiceLinea - 1
	if(indiceLinea<len(lista)):
		maxRango = indiceLinea + 1
	for linea in lista[minRango:maxRango+1]:
		for char in linea[indiceMin:indice+longitud]:
			if(not(char.isnumeric()) and char!='.' and char!='\n'):
				check = True
	return check


line = f.readline()
lista = list()

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
			if(comprobar(indexN, numberL, lista.index(l), lista)):
				sumParts += Number
			numberL = 0
			indexN = 0
			
			Number = 0
		

print("\n", sumParts)


