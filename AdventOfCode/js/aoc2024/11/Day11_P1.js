const { readInput } = require('./../../input')

let text = readInput()

let stones = []

text.split(" ").forEach((stone) => {
    stones.push(stone)
})
for (let steps = 0; steps < 25; steps++) {
    let newStones = []
    for (let i = 0; i < stones.length; i++) {
        let curr = stones[i]
        if (curr === "0") {
            newStones.push("1")
        } else if (curr.length % 2 === 0) {
            newStones.push(curr.substring(0, curr.length / 2))
            let newText = curr.substring(curr.length / 2).replace(/^(0)+/gm, "")
            newStones.push(newText.length > 0 ? newText : "0")
        } else {
            newStones.push(("" + (curr * 2024)))
        }
    }
    stones = newStones
}
console.log("Solucion: ", stones.length)