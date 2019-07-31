// var dIterator = {
// 	[Symbol.iterator]: () => {
// 		return this
// 	},
// 	next: () => {
// 		return {done: false, value: 0}
// 	}
// }

// function Foo() {
// 	this.a = 1
// 	return "1"
// }

// let foo = new Foo()
// let bar = Foo()

// console.log('foo', foo)
// console.log('bar', bar)


function binSearch(arr, val) {
	let low = 0
	let height = arr.length - 1

	while(low <= height) {
		let mid = (low + height) / 2

		if (arr[mid] < val) {
			mid = low + 1
		} else if(arr[mid] > val) {
			mid = height - 1
		} else {
			return mid
		}
	}

	return 0
}
