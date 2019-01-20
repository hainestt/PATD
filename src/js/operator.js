

let a = -1

let b = ~a 				// 0

let c = 0

let d = ~c 				// -1
let d1 = ~~"100.8"		// 100 字符串转数字

let e = 12345.456 | 0  // 12345

let f = '-1000.11'

let g = parseInt(f)  // -1000
let g1 = f >> 0      // -1000
let g2 = f | 0		 // -1000

let h = '1'
++h 				// 2  +h -> 1 -> 1 + 1

let i = 255
i >> 4				// 15 相当于255/(2^4)向下取整

let j = 1
j ^ 1				// 0 按位翻转
