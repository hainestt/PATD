
/**
 * 1，箭头函数的arguments继承父级函数，this指向也是，若没有父级函数，如在浏览器的主执行线程下，或报错（not undefined）
 * 2，箭头函数不能和new一起使用,会报错(not a constructor)
 * 3，箭头函数没有prototype属性
*/

let test = function  () {
	let foo = () => {
		console.log('test-foo', arguments)
	}

	foo ()
}

let foo = (a = 1) => {
	console.log('foo', arguments)
}

let bar = function (a = 1) {
	console.log('bar', arguments)
}
test(1,2,3)
foo (1,2,3)
bar (1,2)

console.log('foo prototype:', foo.prototype)
console.log('new foo:', new foo())
