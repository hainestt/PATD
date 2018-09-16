/***
 * 1,demo
*/
// require('@babel/polyfill')

function *generatorTest() {
	yield 'hello'
	yield 'world'
	yield 'haines'
}

let r = generatorTest()
console.log(r.next())

console.log([12,3,4,5,5,6].includes(2))
console.log(Array.from('2,2,3,4'))
console.log(Promise.resolve().then(() => {return 1111}))


/***
 * 2, 实现
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
