
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
console.log('interpolateSearch', a)


function add (a, b) {
	while(b) {
		let temp = a ^ b
		b = (a & b) << 1
		a = temp
	}

	return a
}

console.log('add->', add(12, 13))


var arr = [
	[1,2,3,4,5],
	[11,22,33,44,55],
	[12,23,34,45,56],
	[13,24,35,46,57],
	[14,25,36,47,58]
]
function findNumber(arr, value) {
	let n = arr.length
	let m = arr[0].length
	let r = n - 1
	let c = 0

	if (!m && !n) {
		return false
	}

	while(r >=0 && c <= m-1) {
		if (arr[r][c] === value) {
			return true
		} else if (arr[r][c] > value) {
			r--
		} else if (arr[r][c] < value) {
			c++
		}
	}

	return false
}

console.log(findNumber(arr, 58))


let pre = [1,2,4,7,3,5,6,8]
let vin = [4,7,2,1,5,3,8,6]

function rebuildBinaryTree(pre, vin) {
	if (!pre.length || !vin.length) {
		return null
	}

	// 前序第一个是根节点，也是中序左右子树的分割点
	let index = vin.indexOf(pre[0])
	let left = vin.slice(0, index)
	let right = vin.slice(index + 1)

	return {
		val: pre[0],
		// 递归左右子树的前序、中序
		left: rebuildBinaryTree(pre.slice(1, index + 1), left),
		right: rebuildBinaryTree(pre.slice(index + 1), right)
	}
}
let node = new rebuildBinaryTree(pre, vin)
console.log('node->', node)


class QueueWithStack {
	constructor() {
		this.outStack = []
		this.inStck = []
	}

	push (...value) {
		let { inStck } = this
		inStck.push(...value)
	}

	pop () {
		let { inStck, outStack } = this
		if(!outStack.length) {
			while(inStck.length) {
				outStack.push(inStck.pop())
			}
		}

		return outStack.pop()
	}
}

let queue = new QueueWithStack()
queue.push(1,2,3,4,4)
console.log('queue->', queue.pop(), queue.pop())


let rotateArr = [3,4,5,1,2]
function minNumberInRotate(arr) {
	let left = 0
	let right = arr.length - 1

	while(right - left > 1) {
		let mid = left + ((right - left) >> 1)

		if (arr[mid] > arr[right]) {
			left = mid
		} else {
			right = mid
		}
	}

	return Math.min(arr[left], arr[right])
}

let insRotateArr = minNumberInRotate(rotateArr)
console.log('insRotateArr -> ', insRotateArr)

function jumpFloor (number) {
	let i = 1

	while(--number) {
		i *= 2
	}

	return i
}
console.log('jumpFloor->', jumpFloor(3))

function addBigNumber (strA, strB) {
	let arrA = strA.split('')
	let arrB = strB.split('')
	let lena = arrA.length
	let lenb = arrB.length
	let temp = 0
	let res = ''

	if (lena > lenb) {
		let gap = lena - lenb
		let i = 0
		while(i < gap) {
			arrB.unshift('0')
			i++
		}
	} else if (lena < lenb){
		let gap = lenb - lena
		let i = 0
		while(i < gap) {
			arrA.unshift('0')
			i++
		}
	}

	while(arrA.length || arrB.length || temp) {
		temp += (~~arrA.pop()) + (~~arrB.pop())
		res = (temp % 10) + res

		temp = temp > 9 ? 1 : 0 // 进位操作
	}

	return res.replace(/^0+/,'')
}

let addins = addBigNumber('898', '989')
console.log('addins', addins)

function simulationNew() {
	let obj = new Object()
	let Constructor = [].shift.call(arguments)

	obj.__proto__ = Constructor.prototype

	let ret = Constructor.apply(obj, arguments)

	let typeOf = ret => ({}).toString.call(ret).slice(8, -1).toLowerCase()

	return typeOf(ret) === 'object' || typeOf(ret) === 'function' ? ret : obj
}

function Person (name) {
	this.name = name

	return 'rock'
}

let simnew = simulationNew(Person, 'haines')
console.log('simulationNew', simnew)

// 优化版斐波那契
class Fibonacci {
	memory (fn) {
		let obj = {}
		return n => {
			if (!obj[n]) {
				obj[n] = fn(n)
				return obj[n]
			}
		}
	}

	fibonacci (n) {
		if (n === 1 || n === 2) {
			return 1
		}
		return this.fibonacci(n-1) + this.fibonacci(n-2)
	}
}

let fib = new Fibonacci()
let insfib =  fib.memory(fib.fibonacci.bind(fib))(10)
console.log('insfib', insfib)


class MatrixPath {
	constructor(data) {
		this.matrix = [
			['a', 'b', 'c', 'e'],
			['s', 'f', 'c', 's'],
			['a', 'd', 'e', 'e']
		] || data

		this.path = 'bcced'
	}

	init () {
		let ret =  this.findPath(this.matrix, this.matrix.length, this.matrix[0].length, this.path)

		return !!ret
	}

	findPath(matrix, rows, cols, path) {
		let visited = Array(rows * cols)
		let pathCount = 0

		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				if (this.hasPath(matrix, rows, cols, i, j, path, visited, pathCount)) {
					return true
				}
			}
		}
	}

	hasPath(matrix,rows, cols, row, col, path, visited, pathCount) {
		let isHasPath = false

		if (pathCount === path.length) {
			return true
		}

		if ( row >=0 && col >=0 && row <rows && col < cols &&  matrix[row][col] === path[pathCount] && !visited[row * cols + col]) {
			visited[row * cols + col] = true
			++pathCount


			isHasPath = this.hasPath(matrix, rows, cols, row - 1, col, path, visited, pathCount) ||
						this.hasPath(matrix, rows, cols, row + 1, col, path, visited, pathCount) ||
						this.hasPath(matrix, rows, cols, row, col - 1, path, visited, pathCount) ||
						this.hasPath(matrix, rows, cols, row, col + 1, path, visited, pathCount)

			if (!isHasPath) {
				--pathCount
				visited[row * cols + col] = false
			}

		}


		return isHasPath
	}
}
let pathTest = new MatrixPath()
console.log('hasPath->', pathTest.init())

function number1count(n) {
	let flag = 1
	let count = 0

	while(flag) {
		if (flag & n) {
			count ++
		}
		flag = flag << 1
	}

	return count
}

console.log('count->', number1count(1023))

var F = function() {
	this.a = 12

	// return this.a = 1
}

var ins = new F()
console.log('ins->', ins)


var test = {
	b: {
		c: {
			d: 'hello word'
		}
	}
}

console.time('obj')
console.log(test.b.c.d)
console.timeEnd('obj')

console.time('arr')
console.log(test['b']['c']['d'])
console.timeEnd('arr')
