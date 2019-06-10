/***
 *
 * 1，非严格模式下，函数声明会被提升到包围它的块的顶部，严格模式下则不会
 * 2，用let, const和class语句声明的变量、常量和类不会被提升，必须先声明再使用
*/

// 'use strict';
// console.log('1foo->', foo()) // 无论严格模式，还是非严格模式下都为undefined
// console.log('2bar->', bar()) // 无论严格模式，还是非严格模式下都为undefined

{
	console.log('2foo->', foo()) // foo声明被提升到包围块的顶部
	console.log('2bar->', bar()) // undefined

	function foo () {
		return 1
	}

	const bar = function () {
		return 2
	}
}

console.log('3foo->', foo()) // 非严格模式下,foo声明被提升到包围块的顶部
