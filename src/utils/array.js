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
