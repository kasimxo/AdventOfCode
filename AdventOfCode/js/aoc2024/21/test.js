const getSum = (a, b) => a + b;
const toInt = (n) => parseInt(n, 10);

//Day 21
class RobotInstructionTranslator {
    #instructions;

    constructor() {
        // Priority: <, v, ^, >, A (except when it would make us cross over a gap)
        this.#instructions = {
            "A0": "<A",
            "A1": "^<<A",
            "A2": "<^A",
            "A3": "^A",
            "A4": "^^<<A",
            "A5": "<^^A",
            "A6": "^^A",
            "A7": "^^^<<A", "A8": "<^^^A", "A9": "^^^A",
            "0A": ">A",
            "01": "^<A", "02": "^A", "03": "^>A",
            "04": "^^<A", "05": "^^A", "06": "^^>A",
            "07": "^^^<A", "08": "^^^A", "09": "^^^>A",
            "1A": ">>vA", "10": ">vA",
            "12": ">A", "13": ">>A",
            "14": "^A", "15": "^>A", "16": "^>>A",
            "17": "^^A", "18": "^^>A", "19": "^^>>A",
            "2A": "v>A", "20": "vA",
            "21": "<A", "23": ">A",
            "24": "<^A", "25": "^A", "26": "^>A",
            "27": "<^^A", "28": "^^A", "29": "^^>A",
            "3A": "vA", "30": "<vA",
            "31": "<<A", "32": "<A",
            "34": "<<^A", "35": "<^A", "36": "^A",
            "37": "<<^^A", "38": "<^^A", "39": "^^A",
            "4A": ">>vvA", "40": ">vvA",
            "41": "vA", "42": "v>A", "43": "v>>A",
            "45": ">A", "46": ">>A",
            "47": "^A", "48": "^>A", "49": "^>>A",
            "5A": "vv>A", "50": "vvA",
            "51": "<vA", "52": "vA", "53": "v>A",
            "54": "<A", "56": ">A",
            "57": "<^A", "58": "^A", "59": "^>A",
            "6A": "vvA", "60": "<vvA",
            "61": "<<vA", "62": "<vA", "63": "vA",
            "64": "<<A", "65": "<A",
            "67": "<<^A", "68": "<^A", "69": "^A",
            "7A": ">>vvvA", "70": ">vvvA",
            "71": "vvA", "72": "vv>A", "73": "vv>>A",
            "74": "vA", "75": "v>A", "76": "v>>A",
            "78": ">A", "79": ">>A",
            "8A": ">vvvA", "80": "vvvA",
            "81": "<vvA", "82": "vvA", "83": "vv>A",
            "84": "<vA", "85": "vA", "86": "v>A",
            "87": "<A", "89": ">A",
            "9A": "vvvA", "90": "<vvvA",
            "91": "<<vvA", "92": "<vvA", "93": "vvA",
            "94": "<<vA", "95": "<vA", "96": "vA",
            "97": "<<A", "98": "<A",

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
        };
    }

    translate(key) {
        if (key[0] === key[1]) {
            // Robot arms don't need to move in this case; we can just press 'A' again.
            return "A";
        } else {
            return this.#instructions[key];
        }
    }
}

class RobotKeypad {
    #code;
    #translator;
    #instructions;

    #setNewKeystrokes(counts, keyStrokes, multiplier) {
        multiplier = multiplier || 1;
        for (let j = 0; j < keyStrokes.length - 1; j++) {
            // The order of the movements doesn't matter, just how many times each one happens.
            let key = keyStrokes.substring(j, j + 2);
            if (counts.has(key)) {
                counts.set(key, counts.get(key) + multiplier);
            } else {
                counts.set(key, multiplier);
            }
        }
    }

    #translateParentInstructions(instructions) {
        let commandCounts = new Map();
        for (let instruction of instructions.keys()) {
            let count = instructions.get(instruction);
            // All robots start on "A" from the previous keystrokes, so we need to account for that.
            this.#setNewKeystrokes(commandCounts, "A" + this.#translator.translate(instruction), count);
        }
        return commandCounts;
    }

    #translateMainKeypadInstructions(layers) {
        let instructions = "A" + this.#code;
        let commandCounts = new Map();
        for (let i = 0; i < instructions.length - 1; i++) {
            this.#setNewKeystrokes(commandCounts, "A" + this.#translator.translate(instructions.substring(i, i + 2)));
        }
        for (; layers > 1; layers--) {
            commandCounts = this.#translateParentInstructions(commandCounts);
        }
        return commandCounts;
    }

    constructor(code, translator, layers) {
        this.#code = code;
        this.#translator = translator;
        this.#instructions = this.#translateMainKeypadInstructions(layers);
    }

    get complexity() {
        // The sum of these values gives us the number of movements the last robot needed to make.
        // Because all robots start at "A", this conveniently equals the number of key presses the
        // human has to make, so we don't need to adjust the resulting sum.
        return this.#instructions.values().reduce(getSum, 0) * toInt(this.#code);
    }
}

function getCodeComplexities(input, layers) {
    let translator = new RobotInstructionTranslator();
    let total = 0;
    for (let line of input) {
        let keypad = new RobotKeypad(line, translator, layers);
        console.log(line, keypad.complexity)
        total += keypad.complexity;
    }
    return total;
}

let content = "540A\n582A\n169A\n593A\n579A";
content = "029A";
//let part = "1";
let part = "2";
console.log(getCodeComplexities(content.split(/\n/g), (part === "1" ? 3 : 21)));