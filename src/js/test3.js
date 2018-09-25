'use strict';

console.log(1)
new Promise(resolve => {
	console.log(2)
	resolve()
})
.then(res => {
	console.log(3)
})
console.log(4)
