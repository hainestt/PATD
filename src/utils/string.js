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
	return String(str).replace(/^\s+(.*)\s+$/, (m0, m1) => m1)
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
 * capitalize
*/
export function capitalize (str) {
	return String(str).replace(/(^[a-z])(.*$)/, (m0, m1, m2) => `${m1.toUpperCase()}${m2}`)

	// or
	// return str.slice(0, 1).toUpperCase() + str.slice(1)
}

/***
 * toCameCase
*/
export function toCameCase (str) {
	return String(str).replace(/-([a-z])/ig, (m0, m1) => m1.toUpperCase())
}

/***
 * underscore
 *
 * ##example
 * underscore('backgroundColor')
 * -> backgroun_color
 *
 * underscore('90HainesTao')
 * -> 90_haines_tao
*/
export function underscore (str) {
	return String(str).replace(/::/g, '/')
		.replace(/([A-Z]+)([A-Z][a-z])/g, (m0, m1, m2) => `${m1}_${m2}`)
		.replace(/([a-z\d])([A-Z])/g, (m0, m1, m2) => `${m1}_${m2}`)
		.replace(/-/g, '_')
		.toLowerCase()
}

/***
 * email test
*/
export function isValidEmail (str) {
	let reg = /^(([^<>()\[\]\\.;:\s+@"]+(\.[^<>()\[\]\\.;:\s+@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([A-Za-z\-0-9]+\.)+[A-Za-z]{2,}))$/

	return reg.test(str)
}

/**
 * js keywords
*/
export function isKeyWord (word) {
	let keyWords =
		`break,case,catch,continue,debugger,default,delete,do,else,false,
		finally,for,function,if,in,instanceof,new,null,return,switch,this,
		throw,true,try,typeof,var,void,while,with,undefined,
		abstract,boolean,byte,char,class,const,double,enum,export,extends,
		final,float,goto,implements,import,int,interface,long,native,
		package,private,protected,public,short,static,super,synchronized,
		throws,transient,volatile,arguments,let,yield,Math`

	let keyWordsArr = keyWords.split(/,/g).map(item => item.trim())

	return keyWordsArr.includes(word)
}

/***
 * json
 * 参考prototype.js
*/
export function unfilterJSON (json, filter) {
	let jsonFilter = /^\/\*-secure-([\s\S]*)\*\/\s*$/

	return json.replace((filter || jsonFilter), (m0, m1) => m1 || '')
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

/***
 * generate hash
*/

var hashCode = function(text) {
	var i, chr, len;
	var hash = 0;

	for (i = 0, len = text.length; i < len; i++) {
	  chr = text.charCodeAt(i);
	  hash = ((hash << 5) - hash) + chr;
	  hash |= 0; // Convert to 32bit integer
	}

	return hash;
  };
