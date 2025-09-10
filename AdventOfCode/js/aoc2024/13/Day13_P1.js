const { readInput, readLines } = require('./../../input')

let text = [
    'Button A: X+94, Y+34',
    'Button B: X+22, Y+67',
    'Prize: X=8400, Y=5400',
    '',
    'Button A: X+26, Y+66',
    'Button B: X+67, Y+21',
    'Prize: X=12748, Y=12176',
    '',
    'Button A: X+17, Y+86',
    'Button B: X+84, Y+37',
    'Prize: X=7870, Y=6450',
    '',
    'Button A: X+69, Y+23',
    'Button B: X+27, Y+71',
    'Prize: X=18641, Y=10279'
]
text = readLines()
let groups = []
/**
 * group: {
*          BAx: x,
*          BAy: x,
*          BBx: x,
*          BBy: x,
*          Px: x,
*          Py: x
 * }
 */
for (let i = 3; i <= text.length; i += 4) {

    let BALine = text[i - 3].replaceAll(',', '').split(':')[1].split(' ')
    let BAx = Number.parseInt(BALine[1].split('+')[1])
    let BAy = Number.parseInt(BALine[2].split('+')[1])
    //console.log("BA", BALine, BAx, BAy)
    let BBLine = text[i - 2].replaceAll(',', '').split(':')[1].split(' ')
    let BBx = Number.parseInt(BBLine[1].split('+')[1])
    let BBy = Number.parseInt(BBLine[2].split('+')[1])
    //console.log("BB", BBLine, BBx, BBy)
    //Prize: X=14578, Y=5476
    let PLine = text[i - 1].replaceAll(',', '').split(':')[1].split(' ')
    let Px = Number.parseInt(PLine[1].split('=')[1])
    let Py = Number.parseInt(PLine[2].split('=')[1])
    //console.log("P", PLine, Px, Py)
    let group = {
        BAx: BAx,
        BAy: BAy,
        BBx: BBx,
        BBy: BBy,
        Px: Px,
        Py: Py
    }
    groups.push(group)
}
/* 
Price = (Px, Py)
ButtonA = (BAx, BAy)
ButtonB = (BBx, BBy)

TimesA = TA
TimesB = TB
0 <= TA <= 100
0 <= TB <= 100

Px = TA * BAx + TB * BBx
Py = TA * BAy + TB * BBy

Cada vez que encuentro una ecuación válida (puede que haya varios pares de valores TA - TB que cumplan la ecuación)
calculo su coste para quedarme con el menor
*/
let solution = 0
groups.forEach((group) => {
    let minSol = Infinity
    for (let TA = 0; TA <= 100; TA++) {
        for (let TB = 0; TB <= 100; TB++) {
            if (group.Px === TA * group.BAx + TB * group.BBx
                && group.Py === TA * group.BAy + TB * group.BBy) {
                minSol = Math.min(minSol, (TA * 3 + TB))
            }
        }
    }
    solution += minSol < 100000000000 ? minSol : 0
})
console.log("Solucion: ", solution)

