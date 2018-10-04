import { generateArr } from '../utils'

var arr = generateArr(100000)
var i = arr.length % 8

console.time('start')

function process (p) {
	console.log(p)
}

while(i) {
	process(arr[i--])
}

i = Math.floor(arr.length / 8)

// while(i) {
// 	process(arr[i--])
// 	process(arr[i--])
// 	process(arr[i--])
// 	process(arr[i--])
// 	process(arr[i--])
// 	process(arr[i--])
// 	process(arr[i--])
// 	process(arr[i--])
// }
console.timeEnd('start')
