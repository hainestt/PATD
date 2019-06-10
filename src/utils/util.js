/**
 *
 * @export
 * @param {* Function} fn
 * @param {* Number} ms
 * @returns {* Function}
 *
 *
 */
export function debounce (fn, ms) {
	let timer = 0, scope, args

	let wrap = function () {
		if (timer) {
			clearTimeout(timer)
		}

		args = ([]).slice.call(arguments)
		scope = this
		timer = setTimeout(_ => {
			timer = 0
			fn.apply(scope, args)
		}, ms)
	}

	return wrap
}


/**
 *
 * @export
 * @param {* Function} fn
 * @param {* Number} ms
 * @param {* Boolean} immediate
 * @returns {* Function}
 *
 *
 */
export function debounceImmediate (fn, ms, immediate) {
	let timer, scope, args, timestamp, result, invokeNow

	let later = function () {
		let last = Date.now() - timestamp

		if (last < ms && last >= 0) {
			timer = setTimeout(later, ms - last)
		} else {
			timer = null
			if (!immediate) {
				result = fn.apply(scope, args)
				if (!timer) {
					scope = args = null
				}
			}
		}
	}

	let wrap = function () {
		scope = this
		args = arguments
		timestamp = Date.now()
		invokeNow = immediate && !timer

		if (!timer) {
			timer = setTimeout(later, ms)
		}

		if (invokeNow) {
			result = fn.apply(scope, args)
			scope = args = null
		}

		return result
	}

	return wrap

}

/**
 *
 *
 * @export
 * @param {* String} url
 * @param {* Function} callback
 * @param {* Object} options
 */
export function loadScript (url, callback, ...options) {
	let script = document.createElement('script')

	script.type = 'text/javascript'
	script.defer = options.defer || true

	if (script.readyState) {	// for IE10-
		script.onreadystatechange = () => {
			if (script.readyState == 'loaded' || script.readyState == 'complete') {
				script.onreadystatechange = null // GC
				callback()
			}
		}
	} else {
		script.onload = callback
	}

	script.src = url
	document.head.appendChild(script)
}


/**
 *
 * @export
 * @param {*} args
 * @returns
 */
export function typeOf (args) {
	return ({}).toString.call(args).slice(8, -1)
}

/**
 *
 *
 * @export
 * @param {*} value
 * @returns {* Number}
 * Number()转换规则：
 * 1, 1024 -> 1024, '4567.11' -> 4567.11
 * 2, true -> 1, false -> 0
 * 3, null -> 0, undefined -> NaN
 * 4, 0xA -> 10
 * 5, '' -> 0
 * 6, 不包含以上的返回NaN
 */
export function toNumber (value) {
	let number = (isNaN(value) || value === null) ? 0 : Number(value)

	return isNaN(number) ? 0 : number
}

/**
 *
 *
 * @export
 * @param {* Function} fn
 * @param {* Object} ctx
 * @returns {* Function}
 *
 * 硬绑定
 * 这里模拟简单的ES5引入的原生Function.prototype.bind方法
 * 原生的bind(不支持IE8)方法效率更高，建议使用原生bind
 *
 * 缺点：会降低函数的灵活性，且硬绑定后无法使用隐式或显式绑定来修改this指向
 */
export function bind (fn, ctx) {
    return function () {
        return fn.apply(ctx, arguments)
    }
}

/***
 * 软绑定
 * 优点：
 * 可修改this指向
 */
if (!Function.prototype.softBind) {
    Function.prototype.softBind = function (obj) {
        let fn = this
        let curried = [].slice.call(arguments, 1)

        let wrap = function () {
            return fn.apply(
                (!this || this === (window || global)) ? obj : this,
                curried.concat.apply(curried, arguments)
            )
        }

        wrap.prototype = Object.create(fn.prototype)
        return wrap
    }
}

/**
 *
 *
 * @export
 * @param {* Object} obj
 * @returns
 *
 * 可检测类型
 * Object, Array, Number, String, Boolean, RegExp, Function, Date, Symbol, Math, Error, Undefined, Null,,,,
 */

export function deepClone (obj) {
	let result
	switch(typeOf(obj)) {
		case 'Object':
			result = {}
			for (let i in obj) {
				if (obj.hasOwnProperty(i)) {
					result[i] = deepClone(obj[i])
				}
			}
			break
		case 'Array':
			result = []
			for (let i = 0, len = obj.length; i < len; i++) {
				result.push(deepClone(obj[i]))
			}
			break
		default:
			result = obj
	}
	return result
}

/***
 * dec to hex
*/
export function toHex (n) {
	//s1
	let hex = Number.prototype.toString.call(n, 16)
	return hex.length < 2 ? [0, n].join('') : hex

	// s2
	// let hexStr = '0123456789ABCDEF'
	// return String(hexStr.substr((n >> 4) & 0x0f, 1) + hexStr.substr(n & 0x0f, 1))
}

export function rgbToHexString (r, g, b) {
	return ['#', toHex(r), toHex(g), toHex(b)].join('')
}

/**
 *
 *
 * @export
 * @param {* Number} x
 * @param {* Number} y
 * @returns {* Boolean}
 *
 * 符号判断
 */
export function singsMatch (x, y) {
	return !((x ^ y) < 0)
}

/**
 *
 * @export
 * @param {* Number} n
 * @returns {* Number} -1 or 0 or 1
 * JavaScript整数的二进制存储为32位，这里的31次移位，使用的是位域的结尾
 */
export function singnum(n) {
	return ((n >> 31) | ((-n) >>> 31))
}

/**
 * 
 * @param {* Number} times 
 * @param {* String} str 
 */
export function repeat(times, str) {
	return (new Array(times + 1)).join(str)
}

/**
 * 
 * @param {* Array} arr
 */
export function flatten (arr) {
	while(arr.some(key => Array.isArray(key))) {
		arr = [].concat(...arr)
	}
	return arr
}