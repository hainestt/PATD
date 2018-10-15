!(function () {
	/***
	 * ⚠️ 这里babel会自动将这里的匿名函数转换为具名函数（名称同声明的变量）
	 * ⚠️ 在严格模式下，js访问arguments.callee这个属性会报错
	*/
	'use strict'
	let factorial = function (num) {
		if (num <= 1) {
			return 1
		} else {
			// return num * arguments.callee(num - 1)
			return num * factorial(num - 1)
		}
	}

	let ins = factorial(5)
	// console.log(ins)

}) ()

!(function () {
	/***
	 * ⚠️ 闭包所保存的是整个变量对象，而不是某个特殊的变量
	*/

	function createFunctions () {
		let result = new Array()

		for (var i = 0; i < 10; i++) {

			// debugger
			result[i] = (function (num) {
				return function () {
					return num
				}
			}) (i)
		}

		return result
	}

	let res = createFunctions()

	console.log('res', res[0](), res[1](), res[2]())


}) ()
