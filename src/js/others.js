
!(function () {
	/***
	 * bable compile
	*/

	function T (fn) {
		fn.call(void 0, arguments)
	}


	T.foo = function (msg) {
		// return new T(function () {
		// 	console.log('msg', msg)
		// })

		/***
		 * this -> T
		 * this.constructor -> [native Function]
		*/
		return new this(function () {
			console.log(msg)
		})
	}

	// Object.defineProperty(T, 'foo', {
	// 	value: msg => {
	// 		/**
	// 		 * Error：babel会将这里的this编译为_this
	// 		*/
	// 		return new this.constructor(function() {
	// 			console.log('msg:', msg)
	// 		})
	// 		return new T(function () {
	// 			console.log('msg:', msg)
	// 		})
	// 	},
	// 	writable: true,
	// 	configurable: false
	// })

	T.foo('Hi, Haines')
})()

!(function () {
	/**
	 * add for any number
	*/
	function add(a, b) {
		if (isFinite(a) && isFinite(b)) {
			let c = a + b
			if (c < Number.MAX_VALUE && c > Number.MIN_VALUE) {
				return c
			} else if (c >= Number.MAX_VALUE) {
				return Infinity
			} else if (c <= Number.MIN_VALUE ) {
				return -Infinity
			}
		} else if ((isFinite(a) && a !== Number.MIN_VALUE && b >= Number.MAX_VALUE) || (a >= Number.MAX_VALUE && isFinite(b) && b !== Number.MIN_VALUE)) {
			return Infinity
		} else if ((isFinite(a) && a !== Number.MAX_VALUE && b <= Number.MIN_VALUE) || (a <= Number.MIN_VALUE && isFinite(b) && b !== Number.MAX_VALUE)) {
			return -Infinity
		} else {
			let c = a + b
			if (isNaN(c)) {
				return 0
			}
			return a + b
		}
	}

	add(1,2) // 3
	add(1, Infinity) // Infinity
	add(1, -Infinity) // -Infinity
	add(Infinity, Infinity) // Infinity
	add(-Infinity, Infinity) // 0
	add(-Infinity, -Infinity) // -Infinity

})()
