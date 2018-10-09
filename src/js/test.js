'use strict'

let octalNumber = 0o77

console.log('octalNum', octalNumber)

console.log(1)

let count = 0
let timer = setInterval(() => {
	count++

	if (count > 3) {
		clearInterval(timer)
	}
	console.log(2)
}, 1000)

console.log('3')
