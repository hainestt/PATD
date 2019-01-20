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
