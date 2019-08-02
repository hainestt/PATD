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

	/***
	 * theory:
	 * 将数组按位数切割成不同的数字，然后按每个位分别比较
	 *
	 *
	*/
	radix () {
		let { data } = this
		// 数组长度
		let len = data.length
		// 数组最大值
		let max = (function(data) {
			let max = 0
			data.forEach(item => item > max ? max = item : void 0)
			return max
		})(data)

		// 最大值长度
		let maxLen = String(max).length

		/***
		 * 获取某一位的数值
		 *
		 * 对于456这个数字：
		 * > 获取个位数: ~~((456 / 1) % 10) = 6
		 * > 获取十位数: ~~((456 / 10) % 10) = 5
		 * > 获取百位数: ~~((456 / 100) % 10) = 4
		*/
		let digit = function(n, b = 0) {
			let num = Math.pow(10, b)

			return ~~((n / num) % 10)
		}

		// 排序
		for (let i = 0; i < maxLen; i++) {
			let radix = 10
			const output = []
			const bucket = Array(radix).fill(0)

			// 将每个数据所在位上的数字放到相应的(索引标识)桶中
			for (let j = 0; j < len; j++) {
				let bucketIndex = digit(data[j], i)
				bucket[bucketIndex]++
			}

			// 计算输出到output的新索引
			for (let j = 1; j < radix; j++) {
				bucket[j] += bucket[j-1]
			}

			// 将原始数据分配给新的output数组
			for (let j = len - 1; j >= 0; j--) {
				let bucketIndex = digit(data[j], i)
				output[--bucket[bucketIndex]] = data[j]
			}

			for (let j = 0; j < len; j++) {
				data[j] = output[j]
			}
		}

		return data
	}
}

// let ans = new Sort([81,29,13,27,32,1,52,49,63,100])
let ans = new Sort([81,29,63,53,100])
// let shell = ans.shell()
let radix = ans.radix()
// console.log('shell->', shell)
console.log('radix->', radix)
