!(function () {
	/**
	 * RegExp.$1~$9
	 * 匹配括号项。非标准，不建议生产环境使用
	*/

	let reg = /(\w+)\s(\w+)/
	let str = 'haines tao'

	str.replace(reg, '$2, $1') // 'tao, haiens'

	let r0 = RegExp.$1 // haines
	let r1 = RegExp.$2 // tao
})()

!(function () {
	/**
	 * 元字符
	*/

	let dot = /./g 			// 匹配除换行符之外的任意字符
	let str = `dot\nt&%`
	str.match(dot) 			// ['d', 'o', 't', 't', '&', '%']


	let wd = /\w/g 			// 匹配字母数字下划线,同[a-zA-Z0-9]
	let str2 =  `Haines_90_web`
	str2.match(wd) 			// ['H', 'a', 'i', 'n', 'e', 's', '_', '9', '0', '_', 'w', 'e', 'b']

})()

!(function () {
	/**
	 * 反义字符
	*/

	let reg1 = /[^h]/ 		// 匹配除‘h’之外的所有字符，其中‘h’还可以为任意字符
	let reg2 = /[^hai]/		// 匹配除'h','a','i'之外的任意字符

})()

!(function () {
	/**
	 * 转义字符
	*/

	let reg1 = /\x10/ 		// 匹配十六进制数
	let reg2 = /\f/			// 匹配换页符，同：\x0c
	let reg3 = /\uFF0F/		// 匹配Unicode字符
})()

!(function () {
	/***
	 * 分组捕获
	*/

	let reg1 = /(?:hai)/			// 匹配hai但不产生分组号
	let reg2 = /haines(?=tao)/ 		// 前瞻断言，匹配haines,但后面必须是tao
	let reg3 = /haines(?!=tao)/		// 后瞻断言，匹配haines,但后面不能是tao

})()

