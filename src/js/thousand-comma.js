

/*** 
 * first
*/
let fn = function (p) {
    let r0 = p.toString().split('.')[0]
    let r1 = p.toString().split('.')[1]
    let result = []
    let counter = 0

    for (let i = r0.length - 1; i >= 0; i--) {
        counter ++

        if (counter % 3 === 0 && i !== 0) {
            result.unshift(r0[i])
            result.unshift(',')
        } else {
            result.unshift(r0[i])
        }
    }

    return result.concat('.').concat(r1).join('')
}

let r = fn(12345112321.0011)

console.log(r)

/***  
 * second
*/
let fn2 = function(p) {
    return p.toLocaleString()
}

let r2 = fn2(212112321321.221)
console.log('\n',r2)


/***  
 * third
*/

let fn3 = function (p) {
    
}