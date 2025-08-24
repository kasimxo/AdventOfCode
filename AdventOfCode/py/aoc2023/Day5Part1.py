f = open("/home/kasimxo/AdventOfCode/Inputs/KaS-AOC-Inputs/2023/D5")

def procesarSeed(seed, almanac):
	for conversion in range(len(almanac)-1):
		currDic = dict(sorted(almanac[conversion+1].items()))
		for i in range(len(currDic)):
			index = len(currDic)-i-1
			keys = list(currDic)
			if seed < keys[index]:
				pass
			elif seed < int(keys[index]) + int(currDic[keys[index]][1]):
				output = seed - int(keys[index]) + int(currDic[keys[index]][0])
				#print("Conversion:", index, "Input:", seed, "Output:",output)
				seed = output
				break
			else:
				break
				
				
		#print(currDic)
	#print("Loc:", seed)
	return seed	

#List of seeds
seeds = list()

#We have dictionaries for each conversion
#We only have to check if seed number is less than x and then range
seedToSoil = {}
soilToFertilizer = {}
fertilizerToWater = {}
waterToLight = {}
lightToTemperature = {}
temperatureToHumidity = {}
humidityToLocation = {}

#A collection that has everything, form seeds to dic
almanac = (seeds, seedToSoil, soilToFertilizer, fertilizerToWater, waterToLight, lightToTemperature, temperatureToHumidity, humidityToLocation)

index = -1

for line in f.readlines():
	if len(line)>1:
		if not(line[0].isnumeric()):
			index += 1
			if index == 0:
				for s in line.split(':')[1].split():
					seeds.append(s)
		else:	
			nums = line.split()
			almanac[index][int(nums[1])] = nums[0], nums[2]
minLocation = -1
for s in almanac[0]:
	loc = procesarSeed(int(s), almanac)
	if loc<minLocation or minLocation == -1:
		minLocation = loc
			
print(minLocation)
