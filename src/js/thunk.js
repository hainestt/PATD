
/***
 * 形实转换程序thunk工具
*/

function thunkify(fn) {
	let args = [].slice.call(arguments, 1)

	return function(cb) {
		args.push(cb)
		return fn.apply(null, args)
	}
}

/***
 * 1,demo
*/

function foo(x, y, cb) {
	setTimeout(() => {
		cb(x + y)
	}, 1000)
}

let fooThunk = thunkify(foo, 3, 4)

fooThunk(sum => {
	console.log(sum)
})

