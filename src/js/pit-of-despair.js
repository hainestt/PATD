
'use strict';

let p = Promise.resolve(42)

p
.then(onfulfilled => {
	a = 3
	return onfulfilled + 28
}, onrejected  => {
	console.error('err1', onrejected)
})
.then(onfulfilled => {
	foo.bar()
	console.log(onfulfilled)
}, onrejected => {
	// console.error('err2', onrejected) // 捕捉到第一个then返回的promise中抛出的错误
})
/**
 * n个then语句
*/
.catch(err => {
	b = 3							 // 若catch内部出现错误就无法捕捉之前抛出的错误了，这就形成了“绝望的陷阱”
	console.error('err-catch', err)  // 捕捉到第二个then返回的promise中抛出的错误
})


/***
 * 理论上解决方案：
 * Promise.reject('Oops').defer()
 * 等待一段时间，调用defer()，就不会出现全局报告出现。为了便于链接，defer()只是返回这同一个promise。便于第一个onrejected捕获到错误。
*/
