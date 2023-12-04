f = open("D:\\AoCInput\\day1.txt", "r")

num1: int = 0
num2: int = 0
numConcat: int = 0
sum: int = 0

line = f.readline()

while line:
    for c in line:
        if c.isnumeric() and num1 == 0:
            
            num1 = int(c)
        if c.isnumeric() and num1 != 0:
            num2 = int(c)
    numConcat = num1*10 + num2
    #print(numConcat)
    sum = sum + numConcat
    num1 = 0
    num2 = 0
    numConcat = 0
    
    line = f.readline()
#print()            
print(sum)

f.close()
