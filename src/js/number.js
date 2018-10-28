
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
