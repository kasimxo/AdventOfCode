f = open("/home/kasimxo/AdventOfCode/Inputs/KaS-AOC-Inputs/2023/D1", "r")

num1: int = 0
num1Index: int = 10000

num2: int = 0
num2Index: int = -0

numConcat: int = 0
sum: int = 0
numeros = ["1","2","3","4","5","6","7","8","9","one","two","three","four","five","six","seven","eight","nine"]
line = f.readline()

while line:
	for n in numeros:
		aux = line.find(n)
		aux2 = line.rfind(n)
		if(aux!=-1 and aux<num1Index):
			num1Index = aux
			num1 = numeros.index(n)%9 + 1
		if(aux2!=-1 and aux2>num2Index):
			num2Index = aux2
			num2 = numeros.index(n)%9 + 1
	numConcat = num1*10 + num2
	print(num1, " ", num2 )
	sum = sum + numConcat
	num1 = 0
	num1Index = 1000000
	num2 = 0
	num2Index = -1
	numConcat = 0 
	line = f.readline()
print(sum)

f.close()
