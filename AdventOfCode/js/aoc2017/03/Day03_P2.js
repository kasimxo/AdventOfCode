const input = 277678

let calculating = true;
let calculatedValues = [{
    x: 0,
    y: 0,
    val: 1
}];
let minX = -1;
let maxX = 1;
let minY = -1;
let maxY = 1;
while(calculating){
    let x = maxX;
    let y = minY + 1;
    let i = 0;
    let inRound = true;

    let directions = [
        {
            order: 0,
            sumX: 0,
            sumY: 1,
            condition: (localX, localY) => localY === maxY
        },
        {
            order: 1,
            sumX: -1,
            sumY: 0,
            condition: (localX, localY) => localX === minX
        },
        {

            order: 2,
            sumX: 0,
            sumY: -1,
            condition: (localX, localY) => localY === minY
        },
        {
            order: 3,
            sumX: 1,
            sumY: 0,
            condition: (localX, localY) => localX === maxX
        }, 
        {
            order: 4,
            sumX: 0,
            sumY: 1,
            condition: (localX, localY) => localY === 0
        }
    ]

    let currCondition = directions[i]
    
    while(inRound){
        let ignore = false;

        if(currCondition.condition(x, y)){
            i++
        }

        currCondition = directions[i]

        if(currCondition === undefined){
            ignore = true
            inRound = false
            i = 0
        }
        if(!ignore){
            if(!calculatedValues.find(o => o.x === x && o.y === y)){
                let sums = calculatedValues.filter(o => (Math.abs(o.x - x) === 1 && o.y === y) || (Math.abs(o.y - y) === 1 && o.x === x) || (Math.abs(o.y - y) === 1 && Math.abs(o.x - x) === 1))
                let val = sums.reduce((acc, curr) => acc + curr.val, 0)
                calculatedValues.push({
                    x: x,
                    y: y,
                    val: val
                })
                if(val > input){
                    calculating = false;
                    console.log(`Found ${val} after ${calculatedValues.length} steps`)
                    return;
                }
            }
            x += currCondition.sumX
            y += currCondition.sumY
        }

    }

    minX--;
    maxX++;
    minY--;
    maxY++;
}


