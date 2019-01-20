'use strct';

const timeout = ms => new Promise(resolve => {
	setTimeout(_ => {
		resolve()
	}, ms)
})

const ajax1 = timeout(2000).then(() => {
	console.log('1')
	return 1
})

const ajax2 = timeout(3000).then(() => {
	console.log('2')
	return 2
})

const ajax3 = timeout(2000).then(() => {
	console.log('3')
	return 3
})

function mergePromise(arrAjax) {
	let arr = []

	!(async () => {
		for (let ifun of arrAjax) {
			let cur = await ifun
			arr.push(cur)
		}

		console.log('done', arr)
	})()
}

// mergePromise([ajax1, ajax2, ajax3])

function mergePromise2(arrAjax) {

	return new Promise(resolve => {

		!(async (arr) => {
			let data = []
			for (let key in arr) {
				await arr[key].then(res => {
					data.push(res)
				})
			}

			return data
		}) (arrAjax).then(val => {
			resolve(val)
		})

	})
}


mergePromise2([ajax1,ajax2 ,ajax3]).then(data => {
	console.log('done', data)
})


/***
 * 只要第一个Promise完成，它就会忽略后续的任何拒绝和完成
*/

if(!Promise.first) {
	Promise.first = function(prs) {
		return new Promise((resolve, reject) => {
			prs.forEach(pr => {
				Promise.resolve(pr)
				.then(resolve)
			})
		})
	}
}

Promise.first([ajax1,ajax2, ajax3])
.then(res => {
	console.log('p-first', res)
})
