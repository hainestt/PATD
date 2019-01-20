
/**
 * exec 与match的异同
 *
 * exec: var a = reg.exec(str[,flag]) //正则表达式提供的方法
 * match: var b = str.match(reg) //字符串提供的方法
 *
 * flag为g或着flag不存在时，exec只会返回第一个匹配项数组,a[0]表示匹配的项，a[1]~a[n]表示第n个括号里匹配的内容
 * match的reg没有g标志时，返回结果和exec相同
 * match的reg有g标志时，返回的是所有项的数组.b[0]~b[n]表示匹配的第n项
*/

/***
 * encodeURI & decodeURI 【用于编码整个URI，URI中合法字符不会被转码】
 * encodeURIComponent & decodeURIComponent 【常用于编码单个请求参数，不会影响整个URI】
 * escape & unescape 【已移除标准，不建议使用】
*/


export function getQuery(url, name) {
	let str = `(^|[&?])${name}=([^&]*)(&|$)`

	// let result = url.match(new RegExp(str))
	let result = new RegExp(str).exec(url)

	if (!!result) {
		return decodeURIComponent(result[2])
	}
	return null
}
