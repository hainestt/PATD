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

	/**
	 * theory:
	 * 在未排序的数列中找到最小的元素，然后将其存放到数列的起始位置；
	 * 再从剩下未排序的数列中选择最小的元素，然后放到已排序的序列末尾。
	 * 以此类推直到排序完毕
	*/
	select () {
		let { data } = this
		let len = data.length
		let min

		for (let i = 0; i < len - 1; i++) {
			min = i
			for (let j = i + 1; j < len; j++) {
				if (data[j] < data[min]) {
					min = j
				}
			}
			if (i !== min) {
				[data[i], data[min]] = [data[min], data[i]]
			}
		}

		return data
	}

	/***
	 * theory:
	 * 将数列看成一个有序表和一个无需表，有序表只有一个元素，无序表有n-1个元素，
	 * 每次从无序表中取出第一个元素，插入到有序表中，直到无序表为空
	*/
	insert () {
		let { data } = this
		let len = data.length

		for(let i = 1; i < len; i++) {
			let temp = data[i]
			let j = i

			while(j >=0 && data[j] < data[j - 1]) {
				[data[j], data[j - 1]] = [data[j - 1], data[j]]
				j--
			}
			data[j] = temp
		}

		return data

	}

	/***
	 * theory:
	 * 分而治之，将原始数组切分成较小的数组，直到每个小数组只有一个位置，
	 * 然后将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组
	*/
	merge () {
		let { data } = this

		let mergeSort = function (arr) {
			if (arr.length > 1) {
				const {length: len} = arr
				const mid = ~~(len / 2)

				// 拆分成左右两个数组
				const left = mergeSort(arr.slice(0, mid))
				const right = mergeSort(arr.slice(mid, len))

				// 排序合并成一个数组
				arr = merge(left, right)
			}

			return arr
		}

		let merge  = function(left, right) {
			let i = 0
			let j = 0
			const result = []

			while(i < left.length && j < right.length) {
				result.push(
					left[i] < right[j] ? left[i++]: right[j++]
				)
			}
			return result.concat(i < left.length ? left.slice(i): right.slice(j))
		}


		return mergeSort(data)
	}

}

let ans = new Sort([81,29,13,27,32,1,52,49,63,100])
// let shell = ans.shell()
// let radix = ans.radix()
// let select = ans.select()
// let insert = ans.insert()
let merge = ans.merge()
console.log('result:', merge)
