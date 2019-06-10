<<<<<<< HEAD
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

let data = {
	code: '400',
	data: {
		'user.name': 'Haines',
		'user.age': 26,
		'user.p.b': '121'
	},
	'a.b': 'test',
	temp: ['1', '2', '3']
}

let expandKey = function(obj) {
	let type = ({}).toString.call(obj).slice(8, -1)
	let result

	switch (type) {
		case 'Object':
			let result = {}
			for (let item in obj) {
				if (obj.hasOwnProperty(item)) {
					let tArr = item.split('.')
					if (tArr.length > 1) {
						// tArr.push(obj[item])


					} else {
						result[item] = expandKey(obj[item])
					}
				}
			}
			break
		case 'Array':
			break
		default:
			result = obj
	}

	return result
}


// expandKey(data)

// "a.b.c" => a.b.c

let arr = ['dba', 'user', 'name', 'haines']
let result = arr.reduce((pre, cur, i, arr) => {
	if (i < arr.length -1) {
		pre[cur] = arr[i+1]
	}
	return pre
} ,{})

console.log(result)

async function a1 () {
	console.log('a1 start')
	await a2()
	console.log('a1 end')
}

async function a2 () {
	console.log('a2')
}
a1 ()
setTimeout(() => {
	console.log('setTimeout')
}, 0)

var promise = new Promise(resolve => {
	resolve('a3')
	console.log('promise then')
})

promise.then(res => {
	console.log('res', res)
})

