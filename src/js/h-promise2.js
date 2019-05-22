
const queue = async function(tasks) {
	const ret = []
	for (let promise of tasks) {
		let r = await promise(ret)
		console.log('r->', r)
		ret.push(r)
	}

	return await ret
}

const a = () => {
	return new Promise(resolve => {
		console.log('100')
		resolve()
	})
}
const b = () => {
	return new Promise(resolve => {
		console.log('200')
		resolve()
	})
}
const c = () => {
	return new Promise(resolve => {
		console.log('300')
		resolve()
	})
}


// const a = () => {
// 	setTimeout(() => {
// 		console.log('100')
// 	}, 1000);

// 	return 1000
// }
// const b = () => {
// 	setTimeout(() => {
// 		console.log('200')
// 	}, 2000)

// 	return 2000
// }
// const c = () => {
// 	setTimeout(() => {
// 		console.log('300')
// 	}, 3000)

// 	return 3000
// }

queue([a, b, c])
.then(data => {
	console.log(data)
})


let foo = function (a,b,c){
	console.log('-->', foo.length)
}

foo(1,2,3)
let ins = foo.length
