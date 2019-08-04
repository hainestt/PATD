
import { typeOf } from './util'

if (!Array.prototype.pluck) {
	Array.prototype.pluck = function (property) {
		let result = []

		this.forEach(value => {
			result.push(value[property])
		})

		return result
	}
}

/***
 * 数组上限项：4294967295
*/
export function generateArr(num = 100) {
	return Array.from(Array(num)).map((item , i, arr) => {
		return parseInt(Math.random() * arr.length)
	})
}

export function generateRangeArr(start = 0, end = 100) {
	let num = end - start

	return Array.from(Array(num)).map((item, i, arr) => {
		return parseInt( start + Math.random() * arr.length)
	})
}

export function duplicateArr(arr = []) {
	let obj = {}
	let ret = []

	arr.forEach(item => {
		if (!obj[item]) {
			ret.push(item)
			obj[item] = true
		}
	})

	return ret
}


/***
 * sortBy
*/

export function sortBy (arr, fn, scope) {

	return arr.map((value, index) => {
		return {
			value: value,
			criteria: fn.call(scope, value, index, this)
		}
	}, this).sort((left, right) => {
		let a = left.criteria
		let b = right.criteria
		return a < b ? -1 : a > b ? 1 : 0
	}).pluck('value')
}

/***
 * zip
 *
 * ##example
 * let name = ['Haines', 'Rock', 'Bob']
 * let age = [27, 26, 28]
 * let goal = ['web developer', 'singer', 'artist']
 *
 * zip(name, age, goal)
 * -> [['Haines', 27, 'web developer'], ['Rock', 26, 'singer'], ['Bob', 28, 'artist']]
 *
 * zip(name, age, goal, (p) => {return `${p[0]} age is ${p[1]}, and his goal is to be a ${p[2]}` })
 * ->["Haines age is 27, and his goal is to be a web developer", "Rock age is 26, and his goal is to be a singer", "Bob age is 28, and his goal is to be a artist"]
*/

export function zip (source, ...target) {
	let args 	 = Array.from(target)
	let len 	 = args.length
	let iterator = x => x

	if (typeOf(args[len - 1]) === 'Function') {
		iterator = args.pop()
	}

	let collections = [source].concat(args)

	return source.map((value, index) => {
		return iterator.call(void 0, collections.pluck(index))
	})
}

/**
 *
 *
 * @export
 * @param {Array} arr
 * @param {String | Number} value
 * @returns { Number }
 *
 * 有序数组
 */
export function findIndex(arr, value) {
	let low = 0
	let height = arr.length - 1

	while(low <= height) {
		let mid = ~~((low + height) / 2)

		if (arr[mid] > value) {
			mid = height - 1
		} else if (arr[mid] < value){
			mid = low - 1
		} else {
			return mid
		}
	}

	return -1
}
