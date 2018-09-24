
/***
 * 1,多线程竞态
*/

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


/***
 * 2，迭代器接口设计
*/

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


function *generatorTest() {
	yield 'hello'
	yield 'world'
	yield 'haines'
}

let r = generatorTest()
// console.log(r.next())

// console.log([12,3,4,5,5,6].includes(2))
// console.log(Array.from('2,2,3,4'))
// console.log(Promise.resolve().then(() => {return 1111}))


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
