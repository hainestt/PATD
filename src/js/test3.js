'use strict';

console.log(1)

new Promise(resolve => {
	console.log(2)
	resolve()
})
.then(res => {
	console.log(3)
})

Promise.resolve(function() {
	return 5
})
.then(res => {
	console.log(res())
})


console.log(4)


function T (fn) {
	fn.call(void 0, arguments)
}


// T.foo = function (msg) {
// 	return new T(function () {
// 		console.log('msg', msg)
// 	})
// }

Object.defineProperty(T, 'foo', {
	value: msg => {
		var self = T
		/**
		 * babel 会将这里的this 转化为_this
		*/
		return new self(function () {
			console.log('msg:', msg)
		})
	},
	writable: true,
	configurable: false
})

T.foo('ss')
