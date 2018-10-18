import {
	unfilterJSON,
	isJSON,
	evalJSON,
	trim,
	sortBy,
	zip,
	capitalize,
	underscore } from '../utils'

let text = `/*-secure-\n{"name": "Haines", "age": 27, "goal": "be a excellent web developer"}\n*/`

let result  = unfilterJSON(text)

let json = evalJSON(result)

let str = '      hello world     '

let arr = ['hello', 'world', 'this', 'is', 'nice']

let arrSort = sortBy(arr, (s) => {
	// return s.charCodeAt(0)
	return s.length
})

let name = ['Haines', 'Rock', 'Bob']
let age = [27, 26, 28]
let goal = ['web developer', 'singer', 'artist']

let arrzip = zip(name, age, goal, (p) => {
	return `${p[0]} age is ${p[1]}, and his goal is to be a ${p[2]}`
})

console.log('arrzip', arrzip)

console.log('haines', capitalize('haines'))
console.log('underscore', underscore('90hainesTao'))



// console.log(json.goal)

// console.log(result)

// console.log(isJSON(result))

// console.log(trim(str))
// console.log(str)

let count = 0
setTimeout(function fn () {
	count ++

	if (count < 50) {
		// setTimeout(fn, 1000)
	}
	console.log('count', count)
}, 1000)
