import { typeOf } from './util'

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

/**
 * 反转字符串
*/
export function reverse (str) {
	return Array.from(str).reverse().join('')
}

/***
 * 去首尾空格
*/

export function trim (str) {
	return String(str).replace(/^\s+(.*)\s+$/, (m0, m1) => {
		return m1
	})
}

/***
 * 去标签
*/

export function trimTag (str) {
	return String(str).replace(/^\w+(\s+("[^"]*"|'[^']*'|[^>])+)?(\/)?>|<\/\w+>/gi, '')
}

/***
 * 转html标签
*/
export function escapeHTML (str) {
	return String(str).replace(/&/g,'&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
}

/**
 * 恢复html标签
*/
export function unescapeHTML (str) {
	return trimTag(String(str)).replace(/&gt;/g, '>')
			.replace(/&lt;/g, '<')
			.replace(/&amp;/g, '&')
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
