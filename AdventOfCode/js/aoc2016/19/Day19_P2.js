let input = 3004953

/*
    This puzzle is an implementation of Josephus problem
    Check wikipedia for an explanation

    The difference with part 1 is that k (the number of people to skip each round) changes in every round
*/

console.log("Sol: ", Josephus(input))
function Josephus(n) {
    let i = 1
    while (i * 3 < n){

        i *= 3
    } 
    return n - i
}