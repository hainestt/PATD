/**
 * 反转字符串
*/
export function reverse (str) {
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


/***
 * 类型检测
*/

export function typeOf (args) {
	return ({}).toString.call(args).slice(8, -1)
}

/***
 * json
 * 参考prototype.js
*/

export function unfilterJSON (json, filter) {
	var jsonFilter = /^\/\*-secure-([\s\S]*)\*\/\s*$/

	return json.replace((filter || jsonFilter), (m0, m1) => {
		return m1 || ''
	})
}

export function isJSON (json) {
	if (!json || typeOf(json) !== 'String') return false

	return /^[\],:{}\s]*$/.test(json.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
		.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
		.replace(/(?:^|:|,)(?:\s*\[)/g, ''))
}

export function evalJSON (json, filter) {
	if (isJSON(json)) {
		let t = unfilterJSON(json, filter)
		return JSON.parse(t)
	} else {
		throw `Invalid JSON:${json}`
	}
}
