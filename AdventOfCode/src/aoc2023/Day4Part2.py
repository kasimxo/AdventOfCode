f = open("/home/kasimxo/AdventOfCode/Inputs/KaS-AOC-Inputs/2023/D4")

def procesar(ID, values):
	repeticiones = 0
	for n in values[0].split():
		if n in values[1].split():
			repeticiones += 1
	print("Winning numbers: ", repeticiones)
	return repeticiones

def sumRep(cards, ID, IDcurr):
	currVal = list(cards.get(str(ID)))
	#print(currVal[2])
	currVal[2] = int(currVal[2]) + cards[IDcurr][2] 
	cards[ID] = tuple(currVal)
	return cards[ID]
	#print(currVal)

#Here we store cards with this struct: ID, winningNumbers, Numbers, Repeats
cards = {}

totCartas = 0
maxID = 0

for line in f.readlines():
	splitted = line.split(':')
	IDRAW = splitted[0].split()[1]
	ID = IDRAW[0:len(IDRAW)]
	Numbers = splitted[1].split('|')
	cards[ID] = Numbers[0], Numbers[1][0:len(Numbers[1])-1], 1
	maxID = ID

for x in range(int(maxID)):
	k = str(x+1)
	#n = numero de cartas a duplicar
	n = procesar(k, cards[k])
	totCartas += cards[k][2]
	print("Cartas a sumar: ", n,"Nº carta:", x+1,"Copias: ", cards[k][2])
	for i in range(n):
		i += 1
		try:
			cards[str(i+int(k))] = sumRep(cards, i+int(k), k)
			#print(i+int(k),cards[str(i+int(k))])
		except:
			pass
	print(cards[k])

#print(cards)
print(totCartas)
