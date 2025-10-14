let input = 3004953

/*
    This puzzle is an implementation of Josephus problem
    Check wikipedia for an explanation
*/

console.log(Josephus(input, 2))

function Josephus(n, k) {
    let i = 1, ans = 0;
    while(i <= n ){
        console.log(i, ans, (ans + k) % i)
        ans = (ans + k) % i;
        i++;
    }
    return ans + 1;
}