f = open("/home/kasimxo/AdventOfCode/Inputs/KaS-AOC-Inputs/2023/D2","r")

reqRed: int = 12
reqGreen: int = 13
reqBlue: int = 14

sumPWRs = 0

def valid(content):
	splitted = content.split(";")
	#handfull of random cubes of a game
	minRed = 0;
	minBlue = 0;
	minGreen = 0;

	for s in splitted:
		colors = s.split(",")
		for c in colors:
			words = c.split()
			match len(words[1]):
				case 3: 
					if(int(words[0])>minRed):
						minRed = int(words[0])
				case 4:
					if(int(words[0])>minBlue):
						minBlue = int(words[0])
				case 5:
					if(int(words[0])>minGreen):
						minGreen = int(words[0])
	return minRed*minBlue*minGreen

line = f.readline()

while line:
	div1 = line.split(": ")
	gameID = div1[0].split()[1]
	sumPWRs += valid(div1[1])		
		

	#print(line)
	line = f.readline()
print(sumPWRs)
