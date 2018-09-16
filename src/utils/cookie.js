

/**
 * 1, document.cookie = "cookieName=mader; expires=Fri, 31 Dec 2017 15:59:59 GMT; path=/mydir; domain=hainest.com; max-age=3600; secure=true";
 * 2, 若后端写header里Set-Cookie = 'cookiename=value;Path=/;Domain=domainvalue;Max-Age=seconds;HttpOnly',有设置HttpOnly则js无法通过document.cookie获取到设定的cookie
*/

export function setCookie (name, value, day) {
	if (day !== 0) {
		let expires = day * 24 * 60 * 60 * 1000
		let date = new Date(+new Date() + expires)

		document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()}`
	} else {
		document.cookie = `${name}=${encodeURIComponent(value)}`
	}
}

export function getCookie (name) {
	let str = `(^| )${name}=([^;]*)(;|$)`

	let result  = new RegExp(str).exec(document.cookie)

	if (!!result) {
		return decodeURIComponent(result[2])
	}
	return null
}

export function removeCookie(name) {
	setCookie(name, '', -1)
}
