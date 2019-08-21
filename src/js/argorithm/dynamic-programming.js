class DynamicProgramming {
	constructor(data) {
		this.data = data
		this.cache = {}
	}
	minCoinChange(n) {
		let { data: coins, cache } = this
		let min = []
		let newMin

		if (!n) {
			return []
		}

		if (cache[n]) {
			return cache[n]
		}

		for (let i = 0; i < coins.length; i++) {
			let coin = coins[i]
			let newn = n - coin

			if (newn >= 0) {
				newMin = this.minCoinChange(newn)
			}

			if (newn >=0 &&
				(newMin.length < min.length - 1 || !min.length) &&
				(newMin.length || !newn)) {
					min = [coin].concat(newMin)
					console.log("new min "+min+"for"+newMin)
				}

		}
		return (cache[n] = min)
	}
}

let ins = new DynamicProgramming([1, 5, 10, 25])
let ret = ins.minCoinChange(36)

console.log('min-coins ->', ret)
