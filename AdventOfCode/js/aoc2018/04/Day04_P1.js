const {readLines} = require('./input')
let input = readLines()

input = [
    "[1518-11-01 00:00] Guard #10 begins shift",
    "[1518-11-01 00:05] falls asleep",
    "[1518-11-01 00:25] wakes up",
    "[1518-11-01 00:30] falls asleep",
    "[1518-11-01 00:55] wakes up",
    "[1518-11-01 23:58] Guard #99 begins shift",
    "[1518-11-02 00:40] falls asleep",
    "[1518-11-02 00:50] wakes up",
    "[1518-11-03 00:05] Guard #10 begins shift",
    "[1518-11-03 00:24] falls asleep",
    "[1518-11-03 00:29] wakes up",
    "[1518-11-04 00:02] Guard #99 begins shift",
    "[1518-11-04 00:36] falls asleep",
    "[1518-11-04 00:46] wakes up",
    "[1518-11-05 00:03] Guard #99 begins shift",
    "[1518-11-05 00:45] falls asleep",
    "[1518-11-05 00:55] wakes up"
]
input = readLines()

input.sort((a,b)=>{
    let time1 = Date.parse(a.substring(1,17).replace(' ','T') + ":00Z")
    let time2 = Date.parse(b.substring(1,17).replace(' ','T') + ":00Z")
    return time1-time2
})

// Con esto el input está ordenado
let guards = {}
let lastGuard = ''
let timeFallSleep = null

input.forEach(l=>{
    const words = l.split(' ')
    const timestamp = Date.parse(l.substring(1,17).replace(' ','T') + ":00Z")
    //console.log(words)
    switch(words[2]){
        case 'Guard':
            //console.log("new guard")
            // Aquí habría que meter función para simular que se despierta en el último segundo?
            lastGuard = words[3].substring(1)
            timeFallSleep = null
            break;
        case 'falls':
            if(timeFallSleep===null){
                timeFallSleep = timestamp
            }
            break;
        case 'wakes':
            if(timeFallSleep!==null){
                const timeAsleep = Math.abs(timeFallSleep - timestamp) / 60000
                timeFallSleep = null
                if(guards[lastGuard]===undefined || guards[lastGuard]===null){
                    guards[lastGuard] = { 
                        time: timeAsleep
                    }
                } else {
                    guards[lastGuard].time += timeAsleep
                }
            }
            break
    }
    if(guards[lastGuard]===undefined || guards[lastGuard]===null){
        guards[lastGuard] = {
            time: 0,
            orders: [l]
        }
    } else {
        if(guards[lastGuard].orders===null || guards[lastGuard].orders === undefined){
            guards[lastGuard][orders] = [l]
        } else {
             guards[lastGuard].orders.push(l)
        }
    }
    /* 
    [1518-07-29 23:56] Guard #3259 begins shift
    [1518-03-31 00:51] falls asleep
    [1518-07-19 00:26] wakes up
    */
})
//No estoy del todo seguro de que eso funcione
// Ahora tenemos que ir guardia por guardia contando el tiempo que está dormido

let max = 0
let guard = null
Object.entries(guards).forEach(([k, v])=> {
    if(v.time>max){
        guards[k].id = Number.parseInt(k)
        guard = guards[k]
        max = v.time
    }
})

// Ahora tenemos que encontrar el minuto específico en el que está mas tiempo dormido

//console.log("GUARD ", guard)
let times = {}
timeFallSleep = null

guard.orders.forEach(o => {
    const words = o.split(' ')
    const timestamp = Date.parse(o.substring(1,17).replace(' ','T') + ":00Z")
    //console.log(words)
    switch(words[2]){
        case 'Guard':
            //console.log("new guard")
            // Aquí habría que meter función para simular que se despierta en el último segundo?
            lastGuard = words[3].substring(1)
            timeFallSleep = null
            break;
        case 'falls':
            if(timeFallSleep===null){
                timeFallSleep = timestamp
            }
            break;
        case 'wakes':
            if(timeFallSleep!==null){
                const timeAsleep = Math.abs(timeFallSleep - timestamp) / 60000
                
                const dateFallSleep = new Date(timeFallSleep)
                const minFallSleep = dateFallSleep.toISOString().split('T')[1].split(':')[1]

                const dateWakeUp = new Date(timestamp)
                const minWakeUp = dateWakeUp.toISOString().split('T')[1].split(':')[1]
                //console.log(minFallSleep, minWakeUp )

                for(let i = minFallSleep; i<minWakeUp; i++){
                    if(times[i]===null || times[i]===undefined){
                        times[i] = 1
                    } else {
                        times[i] += 1
                    }
                }



                timeFallSleep = null
            }
            break
    }
})

let minute = 0
max = 0
Object.entries(times).forEach(([k, v])=> {
    if(v>max){
        minute = Number.parseInt(k)
        max = v
    }
})

console.log(guard.id*minute)