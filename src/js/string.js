import {
	unfilterJSON,
	isJSON,
	evalJSON,
	trim,
	sortBy,
	zip,
	capitalize,
	underscore,
	getCookie,
	deepClone,
	toNumber,
	typeOf,
	getQuery,
	cat,
	rename
 } from '../utils'

let url = 'https://cn.bing.com/search?q=web+%E5%89%8D%E7%AB%AF%E8%B6%8B%E5%8A%BF&qs=n&form=QBRE&sp=-1&pq=web+%E5%89%8D%E7%AB%AF%E8%B6%8B%E5%8A%BF&sc=0-8&sk=&cvid=982DB9D672A9404FABD09A6EACBFD2D1'

console.log('query', getQuery(url, 'q'))


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
console.log('cookie', getCookie('io'))

let  instance = {a:'aa', b: {d: false, f: {a: ['1', '2', '3']}}, c:124, g:Symbol('symble'), h: new Date(), i: /\s+/g, k: () => {return 1}, l: new Error('error'), m: Math}
let deepCloneString = deepClone(instance)
deepCloneString.b.f.a = 'Haines'
console.log(instance.b.f, deepCloneString.b.f)
// let tonumber = toNumber(Symbol(12))
// console.log(tonumber)
console.log(typeOf(''))

console.log(rename({a: 111, b: 222}, {'a': 'AAA'}))


// console.log(json.goal)

// console.log(result)

// console.log(isJSON(result))

// console.log(trim(str))
// console.log(str)
