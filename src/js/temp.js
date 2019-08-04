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


function interpolateSearch (arr, value) {
	let low = 0
	let height = arr.length - 1
	let mid

	while(low <= height && arr[low] <= value && arr[height] >= value) {
		if (arr[low] === arr[height]) {
			return ~~((low + height) / 2)
		}

		mid = ~~(low + (height - low) / ((value - arr[low]) *(arr[height] - value)))

		if(value > arr[mid]) {
			height = mid - 1
		} else if (value < arr[mid]) {
			low = mid + 1
		} else {
			return mid
		}
	}

	return -1
}


let a = interpolateSearch([1,2, 3,4,5,6], 2)
console.log(a)
