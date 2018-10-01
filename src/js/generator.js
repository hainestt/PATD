
import { run } from './promise-generator'

/***
 * 1,多线程竞态
*/


!(function() {
	function step(gen) {
		var it = gen()
		var last

		return function () {
			// 不管yield出来的是什么，下一次都把它原样传回去
			last = it.next(last).value
		}
	}

	var a = 1
	var b = 2

	function *foo () {
		a++
		yield
		b = b * a
		a = (yield b) + 3
	}

	function *bar () {
		b--
		yield
		a = (yield 8) + b
		b = a * (yield 2)
	}

	var s1 = step(foo)
	var s2 = step(bar)

	// 1
	// s1() // a++
	// s1()	// b = b  * a
			// yield b
	// s1()	// a = b + 3 -> a:7,b:4
	// s2() // b--
	// s2() // yield 8
	// s2()	// a = 8 + b
			// yield 2
	// s2()	b = a * 2 	-> a:11, b:22
	console.log(a,b) // 11, 22

	//2
	s1()	// a++  ->a:2,b:2
	s2()	// b--	->a:2,b:1
	s1()	// b = b * a	->a:2,b:2
			// yield b
	s2()	// yiled 8
	s1()	// a = b + 3	->a:5,b:2
			// yield b
	s2()	// a = 8 + b	->a:10,b:2
			// yield 2
	s2()	// b = a * 2	->a:10,b:20
	console.log(a, b) //10,20

})()

/***
 * 2，迭代器接口设计
*/


!(function () {
	var something = (function() {
		var nextVal

		return {
			// for...of循环
			[Symbol.iterator]() {
				return this
			},
			next () {
				if (nextVal === undefined) {
					nextVal = 1
				} else {
					nextVal = (3 * nextVal) + 6
				}

				return {done: false, value: nextVal}
			}

		}
	})()

	for (var v of something) {
		console.log(v)
		if (v > 500) {
			break
		}
	}

})()


/***
 * 3,异步迭代器
*/

function request(url, method = 'GET') {

	let xhr = new XMLHttpRequest()

	return new Promise((resolve, reject) => {
		xhr.open(method, url, true)
		// xhr.setRequestHeader('Content-Type', 'text/html')
		xhr.send()

		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					resolve(xhr.responseText)
				} else {
					reject(xhr.status)
				}
			}
		}
	})

}

!(function() {
	/***
	 * yield 出foo的值在chrome和firefox完全不一样,原因在于setTimeout()返回的是定时器的编号，这个编号由浏览器自由分配，且唯一
	*/
	function foo () {
		return setTimeout(() => {})
	}

	function foo2 () {
		return request('./js/index.js')
		.then(res => {
			return res
		}, err => {
			console.error('err', err)
		})
	}

	function *bar () {
		let r = yield foo()

		console.log('r', r)
	}

	// let it = bar()
	// let p = it.next().value
	// p.then(res => {
	// 	console.log(res)
	// })

	run(bar)

	!(async () => {
		let text = await foo2()
	})()

})()



/***
 * 4，递归委托
 */

!(function() {
	function *foo(val) {
		if (val > 1) {
			val = yield *foo(val - 1)
		}

		return yield request(`./ecma/ecma-logo.svg?val=${val}`)

	}

	function *bar() {
		let r1 = yield foo(3)
		console.log('r1', r1)
	}

	// run(foo, 3)
	// run(bar)
	// let it = bar()
	// console.log('next:', it.next().value )

	!(async () => {
		let r1 = await foo(3)
		console.log('r1', r1.next().value.then(res => {console.log('r1-r1:', res)}))
		console.log('r1', r1.next().value.then(res => {console.log('r1-r2:', res)}))
		console.log('r1', r1.next().value.then(res => {console.log('r1-r3:', res)}))
		console.log('r1', r1.next())
	})()

})()



/***
 *  实现原理
*/

/***
regeneratorRuntime.mark(generatorTest)

function generatorTest() {
	return regeneratorRuntime.wrap(function generatorTest$(_context) {
		   while (1) {
			    switch (_context.prev = _context.next) {
					case 0:
						 _context.next = 2;
						 return 'hello';
					case 2:
						_context.next = 4;
						return 'world';
					case 4:
						_context.next = 6;
						return 'haines';
					case 6:
					case "end":
						return _context.stop();
				}
			}
		}, _marked, this);
	}
		var r = generatorTest();
		console.log(r.next());
**/
