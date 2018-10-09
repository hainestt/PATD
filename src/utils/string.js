

/**
 * 反转字符串
*/
export function reverse(str) {
	return Array.from(str).reverse().join('')
}

/**
 * 字符串填充
*/
if (!String.prototype.padStart) {
	String.prototype.padStart = (len = 0, str = '') => {
		if (this.length > len) {
			return String(this)
		} else {
			len = len - this.length

			if (len > str.length) {

				/**
				 * repeat 不兼容IE
				 */
				// str += str.repeat(len / str.length)

				var count = Math.floor(len / str.length)
				while(count) {
					str+=str
				}
			}

			return str.slice(0, len).concat(String(this))
		}
	}
}


