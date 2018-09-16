
// require('@babel/polyfill')
import { getCookie, setCookie, removeCookie, reverse, generateRangeArr } from '../utils'

for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log('a',new Date, i)
    }, 2000)
}

console.log('b', new Date, i)


setCookie('DUP', 'e0By3YKmt0I4atFWUqqxw2&T=337945508&A=21', 1)
let cookie = getCookie('DUP')

removeCookie('DUP')

console.log(cookie)

let s = '123456789'
let ss = reverse(s)

console.log('ss', ss)

let anum = generateRangeArr(10, 20)

console.log(anum)
