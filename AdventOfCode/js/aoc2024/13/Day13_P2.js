const { readInput, readLines } = require('./input')

let text = readLines()
let groups = []

for (let i = 3; i <= text.length; i += 4) {

    let BALine = text[i - 3].replaceAll(',', '').split(':')[1].split(' ')
    let BAx = Number.parseInt(BALine[1].split('+')[1])
    let BAy = Number.parseInt(BALine[2].split('+')[1])
    let BBLine = text[i - 2].replaceAll(',', '').split(':')[1].split(' ')
    let BBx = Number.parseInt(BBLine[1].split('+')[1])
    let BBy = Number.parseInt(BBLine[2].split('+')[1])
    let PLine = text[i - 1].replaceAll(',', '').split(':')[1].split(' ')
    let Px = Number.parseInt(PLine[1].split('=')[1])
    let Py = Number.parseInt(PLine[2].split('=')[1])
    let group = {
        BAx: BAx,
        BAy: BAy,
        BBx: BBx,
        BBy: BBy,
        Px: Px + 10000000000000,
        Py: Py + 10000000000000
    }
    groups.push(group)
}
let solution = 0
groups.forEach((group) => {
    let TB = ((group.Px * group.BAy) - group.Py * group.BAx) / (group.BBx * group.BAy - group.BBy * group.BAx)
    let TA = (group.Px - TB * group.BBx) / group.BAx

    if (TB % 1 === 0 && TA % 1 === 0) {
        solution += TA * 3 + TB
    }
})
console.log("Solucion: ", solution)