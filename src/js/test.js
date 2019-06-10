// async function async1() {
// 	console.log('async1 start')
// 	await async2()
// 	console.log('async1 end')
// }

// async function async2() {
// 	console.log('async2')
// }

// console.log('start')
// setTimeout(() => {
// 	console.log('setTimeout')
// })

// async1()

// new Promise(resolve => {
// 	console.log('promise')
// 	resolve()
// }).then(() => {
// 	console.log('promise2')
// })
// console.log('end')

// function get() {
// 	return new Promise(resolve => {
// 		setTimeout(() => {
// 			resolve([1,2,3,4,5,6,7])
// 		}, 3000)
// 	})
// }

// !(async () => {
// 	let data = await get()

// 	if (data && data.length > 0) {
// 		let a = 1
// 		data.forEach(item => {
// 			a = 2
// 		})
// 		console.log(a)
// 	}
// })()


// function once(fn) {
// 	let called = false
// 	return function(...args) {
// 		if (called) return
// 		called = true

// 		fn.call(this, args)
// 	}
// }

// function foo (p) {
// 	console.log('1,2,3,4,5,6,7,8,9,10', p)
// }

// once(foo)('haines', 'is a web developer')

// class Foo {
// 	get test () {
// 		return p => {
// 			return p+1
// 		}
// 	}
// }

// let ins = new Foo ()
// let aaa = ins.test('aaa')
// console.log(this)
// console.log(aaa)

// var i = 1
// var i = 2
// var add = function () {
// 	var i = 0
// 	return function () {
// 		i++
// 		console.log(i)
// 	}
// }()

// add ()

// for (let i = 0; i < 10; i++) {
// 	setTimeout(() => {
// 		console.log(i)
// 	}, 100 * i)
// }
// {

// 	while(i < 10) {
// 		let i = 1
// 		setTimeout(() => {
// 			console.log(i)
// 		}, 10 * i)

// 		i += 9
// 	}
// }

// var a = 1
// void function (a) {
// 	console.log(a)
// }(a)

Function.prototype.applyer = function (scope) {
    let ctx
    if (!scope) {
        ctx = this
    } else {
        ctx = scope
    }

    let result

    if (arguments[1]) {
        result = ctx(...arguments[1])
    } else {
        result = ctx()
    }
    ctx = null

    return result
}

function foo () {
    console.log('arguments', arguments)
}

foo.applyer(null, [1,2,3])