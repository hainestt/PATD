// let http = require('http')

// let app = http.createServer((req, res) => {
// 	console.log(req)
// 	res.end('hello')
// })

// app.listen(1688)
// console.log('Server is listening')

// function test(...args) {
// 	// let dest = Array.from(args)
// 	// let dest = args.filter(i => i)
// 	let dest = [].slice.call(args)

// 	console.log(dest)
// }

// test('1','2','3', '4', '5')

exports.isObject = x => toString.call(x).slice(8, -1) === 'Object'
