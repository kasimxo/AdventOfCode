const {readLines} = require('./../../input')

const lines = readLines().filter(l => l.includes('->'))

const roots = []
const branches = new Set()

lines.forEach(l => {
    const words = l.split(' ')
    roots.push(words[0])
    for(let i = 3; i<words.length; i++){
        branches.add(words[i].replace(',', ''))
    }
})

roots.forEach(r => {
    if(!branches.has(r)){
        console.log(r)
    }
})
