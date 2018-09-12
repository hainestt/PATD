export function generateArr(num = 100) {
	return Array.from(Array(num)).map((item , i, arr) => {
		return parseInt(Math.random() * arr.length)
	})
}

