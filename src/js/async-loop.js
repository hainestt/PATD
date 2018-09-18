// !(async () => {

// 	for (var i = 0; i < 10; i++) {

// 		let a = await new Promise(resolve => setTimeout(() => {
// 			console.log('i->', i)
// 			resolve(i)
// 		}, 1000))

// 		console.log('a', a)

// 	}
// })()


function getNode(node, cb) {
	!(async () => {
		let subNodes = node.childNodes

		for (let i = 0, len = subNodes.len; i < len; i++) {
			let subNode = await new Promise(resolve => setTimeout(() => {
				debugger
				resolve(subNodes[i])
			}, 0))

			getNode(subNode, cb(subNode))
		}
	})()
}

function handler(a) {
	console.log('a', a)
}
// getNode(document.querySelector('#id'), handler)

function fn (num) {
	if (num < 1) {
		return 1
	} else {
		return num * fn(num - 1)
	}
}

console.log(fn(4))
