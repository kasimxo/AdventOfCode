f = open("/home/kasimxo/AdventOfCode/Inputs/KaS-AOC-Inputs/2023/D2","r")

reqRed: int = 12
reqGreen: int = 13
reqBlue: int = 14

sumIDs = 0

def valid(content):
	splitted = content.split(";")
	#handfull of random cubes of a game
	for s in splitted:
		colors = s.split(",")
		for c in colors:
			words = c.split()
			match len(words[1]):
				case 3: 
					if (int(words[0])>reqRed): 
						print("FAIL RED - ", words[0])
						return False
				case 4:
					if(int(words[0])>reqBlue):
						print("FAIL BLUE - ", words[0])
						return False
				case 5:
					if(int(words[0])>reqGreen):
						print("FAIL GREEN - ", words[0])
						return False
	return True

line = f.readline()

while line:
	div1 = line.split(": ")
	gameID = div1[0].split()[1]
	if(valid(div1[1])):
		sumIDs += int(gameID)	
		
	

	#print(line)
	line = f.readline()
print(sumIDs)
