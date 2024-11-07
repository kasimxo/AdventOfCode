const { readLines } = require('./input.js')

var text = readLines()

let load = text.filter((line) => line.split(' ')[0].localeCompare('bot') === 0)
let exec = text.filter((line) => line.split(' ')[0].localeCompare('bot') !== 0)

let robots = {}
let outputs = {}

load.forEach((line) => {
    let words = line.split(' ')
    let id = Number.parseInt(words[1])
    let lowId
    let highId
    let lowType
    let highType
    if (words[3].localeCompare('low') === 0) {
        lowId = Number.parseInt(words[6])
        lowType = words[5]
        highId = Number.parseInt(words[11])
        highType = words[10]
    } else {
        lowId = Number.parseInt(words[11])
        lowType = words[10]
        highId = Number.parseInt(words[6])
        highType = words[5]
    }

    robots[id] = {
        chipA: 0,
        chipB: 0,
        lowId: lowId,
        lowType: lowType,
        highId: highId,
        highType: highType
    }
})

exec.forEach((line) => {
    let words = line.split(' ')

    let chip = Number.parseInt(words[1])
    let id = Number.parseInt(words[5])
    let robot = robots[id]
    //console.log(robot)
    if (robot.chipA === 0) {
        robot.chipA = Number.parseInt(chip)
    } else if (robot.chipB === 0) {
        robot.chipB = Number.parseInt(chip)
    }

    waterfallEffect()
})

console.log('Solucion: ', outputs[0] * outputs[1] * outputs[2], outputs)

function waterfallEffect() {
    let changes = false
    Object.keys(robots).forEach((key) => {
        let robot = robots[key]
        if (robot.chipA !== 0 && robot.chipB !== 0) {
            changes = true
            let bigger = Math.max(robot.chipA, robot.chipB)
            let lower = Math.min(robot.chipA, robot.chipB)
            robot.chipA = 0
            robot.chipB = 0
            console.log(robot)
            if (robot.lowType.localeCompare('output') === 0) {
                if (outputs[robot.lowId] === undefined) {
                    outputs[robot.lowId] = lower
                } else {
                    outputs[robot.lowId] = outputs[robot.lowId] + lower
                }
            } else if (robots[robot.lowId].chipA === 0) {
                robots[robot.lowId].chipA = lower
            } else if (robots[robot.lowId].chipB === 0) {
                robots[robot.lowId].chipB = lower
            }
            if (robot.highType.localeCompare('output') === 0) {
                if (outputs[robot.highId] === undefined) {
                    outputs[robot.highId] = bigger
                } else {
                    outputs[robot.highId] = outputs[robot.highId] + bigger
                }
            } else if (robots[robot.highId].chipA === 0) {
                robots[robot.highId].chipA = bigger
            } else if (robots[robot.highId].chipB === 0) {
                robots[robot.highId].chipB = bigger
            }
        }
    })

    if (changes) {
        waterfallEffect()
    }
}