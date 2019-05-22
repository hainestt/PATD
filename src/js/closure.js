/***
 * 闭包
 * 1，在函数声明时创建
 * 2，能hold住变量以及参数引用的地址
 *
*/

function closure1 () {
	let i = 1

	return function bar() {
		console.log('i->', i)
	}
}

let ins = closure1()()

function closure2 (fn, x) {
	if (x < 1) {
		closure2(g, 1)
	} else {
		fn()
	}

	function g () {
		console.log(x)
	}
}

function h () {}
closure2(h, 0) // 0 ->没有闭包则为1
