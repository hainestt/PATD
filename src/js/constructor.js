
/***
 * 1,表象：a有一个指向Foo的constructor属性
*/
function Foo() {}

let a = new Foo()

let q1 = a.constructor === Foo  //true

console.log(q1)


/***
 * 2,探究：
 * .contructor引用(通过[[Prototype]])只是委托给了Foo.prototype,而Foo.prototype的属性constructor在函数声明时默认指向Foo。
 * 若给Foo.prototype创建一个新的对象时，它也就失去了默认的constructor属性，此时它会继续委托给原型链上端的Object.prototype，这个对象有constructor属性，指向内置的Object()函数。
 *
*/

function Foo() {}

Foo.prototype = {}

let b = new Foo()

let b1 = b.constructor === Foo // false
let b2 = b.constructor === Object // true

console.log(b1, b2)

/***
 * 3，解惑：
 * 手动给Foo.prototype添加一个constructor属性
*/

function Foo() {}

Foo.prototype = {}

Object.defineProperty(Foo.prototype, 'constructor', {
	enumerable: false, //constructor属性默认不可枚举
	writable: true,
	configurable: true,
	value: Foo // 让.constructor指向Foo
})


let c = new Foo()

let c1 = c.constructor === Foo // true

console.log(c1)

/***
 * 4,结论：
 * constructor属性不可枚举，但可配置，且其值可写。因此，.constructor引用不可靠，应尽量避免
*/
