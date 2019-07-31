class Sort {
	constructor (arr) {
		this.data = arr
	}

	/***
	 * theory:
	 * 把待排序的数列按照一定的增量分割成多个子数列；随着增量的逐渐减少，每组包含的元素越来越多，当增量减少到1时，整个文件恰被分割成一组，算法终止
	 * 复杂度:
	 * 最好:o(n)；最差：o(n^2);一般:o(n^(3/2))
	 * des:
	 * 如下数组: [8,9,1,7,2,3,5,4,6,0]
	 *
	 * <1>,step = 5,分两组:
	 * 8,9,1,7,2
	 * 3,5,4,6,0
	 * 分别按列排大小得到: 3,5,1,6,0,8,9,4,7,2
	 *
	 * <2>,step = 2,分为5组:
	 * 3,5
	 * 1,6
	 * 0,8
	 * 9,4
	 * 7,2
	 * 分别按列排大小得到: 0,1,3,7,9,2,4,5,6,8
	 *
	 * <3>,step = 1,直接比大小,得到: 0,1,2,3,4,5,6,7,8,9
	 *
	*/
	shell () {
		let { data } = this
		let len = data.length
		let step = ~~(len / 2)

		while(!!step) {
			for (let i = 0; i < step; i++) {
				for (let j = step + i; j < len; j++) {
					let temp = data[j]

					for(var n = j; n - step >=0 && data[n-step] > temp; n -= step) {
						data[n] = data[n-step]
					}

					data[n] = temp
				}
			}

			step >>= 1
		}

		return data
	}
}

let ans = new Sort([8,9,1,7,2,3,5,4,6,0])
let shell = ans.shell()
console.log('shell->', shell)
