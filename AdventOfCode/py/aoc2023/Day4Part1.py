f = open("/home/kasimxo/AdventOfCode/Inputs/KaS-AOC-Inputs/2023/D4")

def checkLine(winningNumbers, haveNumbers):
	value = 0
	for wN in winningNumbers:
		if wN in haveNumbers:
			if value == 0:
				value = 1
			else:
				value *= 2
	return value

totValue = 0


for line in f.readlines():
	numbers = line.split(':')[1].split('|')
	totValue += checkLine(numbers[0].split(), numbers[1].split())

print(totValue)

