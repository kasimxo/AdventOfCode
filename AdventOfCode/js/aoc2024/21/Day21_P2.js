const { readLines } = require('./input')
const cheatCode = {
    "A^": "<A",
    "A<": "v<<A",
    "Av": "<vA",
    "A>": "vA",
    "^A": ">A",
    "^<": "v<A",
    "^v": "vA",
    "^>": "v>A",
    "<A": ">>^A",
    "<^": ">^A",
    "<v": ">A",
    "<>": ">>A",
    "vA": "^>A",
    "v^": "^A",
    "v<": "<A",
    "v>": ">A",
    ">A": "^A",
    ">^": "<^A",
    "><": "<<A",
    ">v": "<A"
}
let text = [
    '029A',
    '980A',
    '179A',
    '456A',
    '379A'
]
text = [
    '029A'
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
//text = readLines()
let count = 0
let cache = {} // Stores inputs and outputs, eg: '<': 'v<<A>>^A'
let rCache = {}

/**
 * 1073125841076766 TOO HIGH
 * 419822472272886 TOO HIGH
 * 254531036205832 TOO HIGH
 * 
 */


text.forEach((code) => {
    //console.log(code)
    let numPartRaw = ""
    code.split('').forEach((letter) => {
        if (("0123456789").indexOf(letter) >= 0) {
            numPartRaw += letter
        }
    })
    let numPart = Number.parseInt(numPartRaw)
    let vars = firstStep(code)

    let len = Infinity
    vars.forEach((v, i) => {
        console.log(v, i)
        let calculated = nextStep(v.command, 20)
        len = Math.min(len, calculated)
    })
    //console.log("SOL ", code, len * numPart)
    count += len * numPart

})
console.log(count)
/*
<vA<AA>>^AvAA<^A>A<v<A>>^AvA^A<vA>^A<v<A>^A>AAvA^A<v<A>A>^AAAvA<^A>A
A<^A>Av<<A>>^AvA^A<vA^>Av<<A>^A>AAvA^Av<<A>A^>AAA<Av>A^A
v<<A>>^A<A>AvA<^AA>A<vAAA>^A
>>^A<A>AvA<^AA>A<vAAA^>A
<A^A>^^AvvvA
<A^A>^^AvvvA
029A
*/
/**
 *  Devuelve la longitud cuando remaining = 0 porque ya no hay que iterar más
 */
function nextStep(string, remaining) {
    let len = 0
    let key = ""
    if (rCache[`${string};${remaining}`] !== undefined) {
        return rCache[`${string};${remaining}`]
    } else {
        //if (rCache[`${string};${remaining}`] === undefined) {
        if (remaining === 0) {
            rCache[`${string};${remaining}`] = string.length
            len = string.length
        } else {
            let calculateLen = 0
            let newS = ""
            newS += calculateCache("A" + string[0])
            for (let i = 0; i < string.length - 1; i++) {
                let l = calculateCache(string[i] + string[i + 1])
                newS += l
            }
            let nLen = nextStep(newS, remaining - 1)
            //console.log(string, nLen)
            len += nLen
        }
        //} else {
        //    len = Math.min(len, rCache[`${string};${remaining}`])
        //}
        //if (key.length > 0 && rCache[key] === undefined || len < rCache[key]) {
        //    rCache[key] = len
        //    console.log(key, rCache[key])
        //}
        //console.log(string, string.length)
        //rCache[`${string};${remaining}`] = len
        return len
    }
}

function calculateCache(string) {
    //console.log(string)
    if (string[0] === string[1]) {
        return "A"
    } else {
        return cheatCode[string]
    }
}

/*
function calculateCache(string) {
    let split = string.split('')
    let calculatedString = ""
    let forbidden = {
        x: 0,
        y: 0
    }
    // We always start at the beggining
    let pos = {
        x: 2,
        y: 0
    }
    let games = [
        {
            x: 2,
            y: 0,
            command: ""
        }
    ]
    split.forEach((letter) => {
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
 
    //console.log(calculatedString, string, split)
    //console.log(games)
    
//console.log(games.length)
let arr = []
games.forEach((el) => {
    let pre = el.command
    let su = ""
    pre.split('').forEach((l) => {
        if (l === "<") {
            su = ">" + su
        } else if (l === "^") {
            su = "v" + su
        } else if (l === "v") {
            su = "^" + su
        } else if (l === ">") {
            su = "<" + su
        }
    })
    let newSu = cleanSu(su)
    //console.log("parts", pre, su, " - ", newSu)
    calculatedString = pre + newSu + "A"
    arr.push(calculatedString)
})
 
return arr
}
*/
function cleanSu(string) {
    let countLeft = 0
    let countRight = 0
    let countUp = 0
    let countDown = 0
    for (let i = 0; i < string.length; i++) {
        if (string[i] === "<") {
            countLeft++
        } else if (string[i] === "^") {
            countUp++
        } else if (string[i] === "v") {
            countDown++
        } else if (string[i] === ">") {
            countRight++
        }
    }
    countLeft = countLeft - countRight
    countUp = countUp - countDown
    let clean = ""
    while (countLeft > 0) {
        countLeft--
        clean += "<"
    }
    while (countLeft < 0) {
        countLeft++
        clean += ">"
    }
    while (countUp > 0) {
        countUp--
        clean += "^"
    }
    while (countUp < 0) {
        countUp++
        clean += "v"
    }
    return clean
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