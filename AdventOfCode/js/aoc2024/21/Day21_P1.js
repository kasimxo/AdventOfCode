const { readLines } = require('./input')

let text = [
    '029A',
    '980A',
    '179A',
    '456A',
    '379A'
]
let finalKB = [
    '789',
    '456',
    '123',
    '-0A'
]
let directionalKB = [
    '-^A',
    '<v>'
]
text = readLines()
let count = 0
text.forEach((code) => {
    console.log(code)
    let numPartRaw = ""
    code.split('').forEach((letter) => {
        if (("0123456789").indexOf(letter) >= 0) {
            numPartRaw += letter
        }
    })
    let numPart = Number.parseInt(numPartRaw)
    let vars = firstStep(code)
    let newVars = []
    vars.forEach((v) => secondStep(v.command).forEach((nV) => newVars.push(nV)))
    newVars.sort((a, b) => a.command.length - b.command.length)
    //console.log(newVars.length)
    newVars = newVars.filter((a) => a.command.length === newVars[0].command.length)
    console.log(newVars.length, newVars[0].command.length)

    let lastVars = []
    newVars.forEach((v, i) => {
        console.log(i, newVars.length, v.command.length)
        secondStep(v.command).forEach((nV) => lastVars.push(nV))
    })
    //console.log(lastVars.length)
    lastVars.sort((a, b) => a.command.length - b.command.length)
    lastVars = lastVars.filter((a) => a.command.length === lastVars[0].command.length)
    console.log(lastVars.length)


    let best = ""
    let min = Infinity
    lastVars.forEach((v) => {
        let complexity = v.command.length * numPart
        if (complexity < min) {
            min = complexity
            best = v.command
        }
    })
    count += best.length * numPart
    console.log(code, best.length, numPart, best.length * numPart)


})
console.log(count)
/*
<vA<AA>>^AvAA<^A>A<v<A>>^AvA^A<vA>^A<v<A>^A>AAvA^A<v<A>A>^AAAvA<^A>A
v<<A>>^A<A>AvA<^AA>A<vAAA>^A
<v<A>>^A<A>AvA<^AA>A<vAAA>^A
<A^A>^^AvvvA
<A^A>^^AvvvA
029A
*/


function thirdStep(code) {

    let command = ""
    let forbidden = {
        x: 0,
        y: 0
    }
    // Posicion inicial del robot final en el keypad direccional: A
    let games = [
        {
            x: 2,
            y: 0,
            command: ""
        }
    ]
    code.split('').forEach((letter) => {
        let goal = {
            x: 0,
            y: 0
        }
        for (let y = 0; y < directionalKB.length; y++) {
            for (let x = 0; x < directionalKB[0].length; x++) {
                if (directionalKB[y][x] === letter) {
                    goal.x = x
                    goal.y = y
                }
            }
        }
        let calculating = true

        while (calculating) {
            let newGames = []
            while (games.length > 0) {
                let curr = games.shift()
                diffX = goal.x - curr.x
                diffY = goal.y - curr.y
                if (diffX === 0 && diffY === 0) {
                    newGames.push({
                        x: curr.x + 0,
                        y: curr.y + 0,
                        command: curr.command + "A"
                    })
                    calculating = false
                    games = []
                } else if (calculating) {
                    if (diffX > 0 && (curr.x + 1 !== forbidden.x || curr.y !== forbidden.y)) {
                        newGames.push({
                            x: curr.x + 1,
                            y: curr.y + 0,
                            command: curr.command + ">"
                        })
                    } else if (diffX < 0 && ((curr.x - 1) !== forbidden.x || curr.y !== forbidden.y)) {
                        newGames.push({
                            x: curr.x - 1,
                            y: curr.y + 0,
                            command: curr.command + "<"
                        })
                    }
                    if (diffY > 0 && (curr.x !== forbidden.x || curr.y + 1 !== forbidden.y)) {
                        newGames.push({
                            x: curr.x + 0,
                            y: curr.y + 1,
                            command: curr.command + "v"
                        })
                    } else if (diffY < 0 && (curr.x !== forbidden.x || curr.y - 1 !== forbidden.y)) {
                        newGames.push({
                            x: curr.x + 0,
                            y: curr.y - 1,
                            command: curr.command + "^"
                        })
                    }
                }

            }
            games = newGames
        }
    })
    command = games[0].command
    return command
}



function secondStep(code) {

    let command = ""
    let forbidden = {
        x: 0,
        y: 0
    }
    // Posicion inicial del robot final en el keypad direccional: A
    let games = [
        {
            x: 2,
            y: 0,
            command: ""
        }
    ]
    code.split('').forEach((letter) => {

        let goal = {
            x: 0,
            y: 0
        }
        for (let y = 0; y < directionalKB.length; y++) {
            for (let x = 0; x < directionalKB[0].length; x++) {
                if (directionalKB[y][x] === letter) {
                    goal.x = x
                    goal.y = y
                }
            }
        }
        let calculating = true

        while (calculating) {
            let newGames = []
            while (games.length > 0) {
                let curr = games.shift()
                diffX = goal.x - curr.x
                diffY = goal.y - curr.y
                if (diffX === 0 && diffY === 0) {
                    newGames.push({
                        x: curr.x + 0,
                        y: curr.y + 0,
                        command: curr.command + "A"
                    })
                    calculating = false
                    //games = []
                } else if (calculating) {
                    if (diffX > 0 && (curr.x + 1 !== forbidden.x || curr.y !== forbidden.y)) {
                        newGames.push({
                            x: curr.x + 1,
                            y: curr.y + 0,
                            command: curr.command + ">"
                        })
                    } else if (diffX < 0 && ((curr.x - 1) !== forbidden.x || curr.y !== forbidden.y)) {
                        newGames.push({
                            x: curr.x - 1,
                            y: curr.y + 0,
                            command: curr.command + "<"
                        })
                    }
                    if (diffY > 0 && (curr.x !== forbidden.x || curr.y + 1 !== forbidden.y)) {
                        newGames.push({
                            x: curr.x + 0,
                            y: curr.y + 1,
                            command: curr.command + "v"
                        })
                    } else if (diffY < 0 && (curr.x !== forbidden.x || curr.y - 1 !== forbidden.y)) {
                        newGames.push({
                            x: curr.x + 0,
                            y: curr.y - 1,
                            command: curr.command + "^"
                        })
                    }
                }

            }
            games = newGames
        }
    })
    //console.log(games)
    command = games[0].command
    return games
}





function firstStep(code) {
    let combos = []
    let command = ""
    let forbidden = {
        x: 0,
        y: 3
    }
    // Posicion inicial del robot final en el keypad: A
    let games = [
        {
            x: 2,
            y: 3,
            command: ""
        }
    ]
    code.split('').forEach((letter) => {
        let goal = {
            x: 0,
            y: 0
        }
        for (let y = 0; y < finalKB.length; y++) {
            for (let x = 0; x < finalKB[0].length; x++) {
                if (finalKB[y][x] === letter) {
                    goal.x = x
                    goal.y = y
                }
            }
        }
        let calculating = true

        while (calculating) {
            let newGames = []
            while (games.length > 0) {
                let curr = games.shift()
                diffX = goal.x - curr.x
                diffY = goal.y - curr.y
                if (diffX === 0 && diffY === 0) {
                    newGames.push({
                        x: curr.x + 0,
                        y: curr.y + 0,
                        command: curr.command + "A"
                    })
                    calculating = false
                    //games = []
                } else if (calculating) {
                    if (diffX > 0 && (curr.x + 1 !== forbidden.x || curr.y !== forbidden.y)) {
                        newGames.push({
                            x: curr.x + 1,
                            y: curr.y + 0,
                            command: curr.command + ">"
                        })
                    } else if (diffX < 0 && ((curr.x - 1) !== forbidden.x || curr.y !== forbidden.y)) {
                        newGames.push({
                            x: curr.x - 1,
                            y: curr.y + 0,
                            command: curr.command + "<"
                        })
                    }
                    if (diffY > 0 && (curr.x !== forbidden.x || curr.y + 1 !== forbidden.y)) {
                        newGames.push({
                            x: curr.x + 0,
                            y: curr.y + 1,
                            command: curr.command + "v"
                        })
                    } else if (diffY < 0 && (curr.x !== forbidden.x || curr.y - 1 !== forbidden.y)) {
                        newGames.push({
                            x: curr.x + 0,
                            y: curr.y - 1,
                            command: curr.command + "^"
                        })
                    }
                }

            }
            games = newGames
        }
    })
    //console.log(games.length)
    command = games[0].command
    return games
}