!(function () {
	/***
	 * 原型链
	 *
	 * 存在问题：
	 * 1，包含引用类型值的原型
	 * 2，在创建子类型的实例时，不能向超类型的构造函数中传递参数
	*/

	function Parent () {
		this.des = 'prototype chain'
		this.colors = ['red', 'blue', 'green']
	}

	Parent.prototype.getDes = function () {
		return this.des
	}

	function Child () {
		this.cDes = 'child'
	}

	Child.prototype = new Parent()
	// ⚠️使用字面量添加新方法，会导致上一行代码无效
	// Child.prototype = {
	// 	getChildDes () {
	// 		return this.cDes
	// 	},
	// 	otherFn () {
	// 		return false
	// 	}
	// }

	Child.prototype.getChildDes = function () {
		return this.cDes
	}

	// demo
	let instance = new Child()
	let des = instance.getChildDes()
	let pDes = instance.getDes()

	// 出现问题：每个实例没有自己独立的属性
	instance.colors.push('black')
	let colors = instance.colors

	let instance2 = new Child()
	let colors2 = instance2.colors



	console.log('child des:', des, 'parent des:', pDes, 'colors', colors, 'colors2', colors2)


})()

!(function () {
	/***
	 * 经典继承：借用构造函数(constructor stealing)
	 *
	 * 存在问题：
	 * 方法都在构造函数中定义，无法实现函数复用
	 *
	*/

	function Parent (name) {
		this.name = name
		this.des = 'constructor stealing'
		this.colors = ['red', 'blue', 'green']

		this.getName = function() {
			return this.name
		}
	}

	function Child (name) {
		Parent.call(this, name)
		this.age = 27
	}

	// demo
	let instance = new Child('Haines')
	let name = instance.getName()
	let age = instance.age

	instance.colors.push('black')
	let colors = instance.colors

	console.log('name:', name, 'age:', age, 'des:', instance.des, 'colors', colors)

	let instance2 = new Child('Rock')
	let name2 = instance2.getName()
	let age2 = instance2.age
	let colors2 = instance2.colors

	console.log('name2:', name2, 'age2:', age2, 'des:', instance2.des, 'colors2', colors2)

})()

!(function () {
	/***
	 * 组合继承（combination inheritance）
	 * 存在问题：
	 * 无论什么情况下都会调用两次超类型构造函数
	*/

	function Parent (name) {
		this.name = name
		this.des = 'combination inheritance'
	}

	Parent.prototype.getName = function () {
		return this.name
	}

	function Child (name, age) {
		Parent.call(this, name) // 第二次调用Parent()

		this.age = age
	}

	Child.prototype = new Parent() // 第一次调用Persont()。每次实例化Child时都实例化一个Parent, 保证每个Child实例都有自己的属性
	// Child.prototype = Object.create(Parent.prototype) // Object.create()支持IE9+
	Child.prototype.constructor = Child
	Child.prototype.getAge = function () {
		return this.age
	}

	// demo
	let instance = new Child('Haines', 28)
	let name = instance.getName()
	let age = instance.getAge()

	console.log('name:', name, 'age:', age, 'des:', instance.des)

	let instance2 = new Child('Rock', 29)
	let name2 = instance2.getName()
	let age2 = instance2.getAge()

	console.log('name2:', name2, 'age2:', age2, 'des:', instance2.des)

})()

!(function() {
	/***
	 * 原型式继承
	 *
	*/

	// 未标准化的Object.create()。Object.create()第二个参数与Object.defineProperties()方法的第二个参数格式相同
	function object (o) {
		function F() {}
		F.prototype = o

		return new F()
	}

	let person = {
		name: 'Haines',
		friends: ['bob', 'alan', 'duncan', 'matt']
	}

	// demo
	let person1 = object(person)
	person1.name = 'Walker'
	person1.friends.push('haines')

	let person2 = object(person)
	person2.name = 'Fremont'
	person2.friends.push('tong')

	console.log('cPerson1 ', person1.name, 'cPerson2', person2.name, 'person', person.name, 'person.friends', person.friends)

})()

!(function () {
	/***
	 * 寄生式继承(parasitic)
	*/

	function createAnthor(o) {
		let colne = Object.create(o)
		colne.sayHi = function () {
			return 'Hi'
		}

		return colne
	}

	// demo
	let person = {
		name: 'Haines',
		friends: ['bob', 'alan', 'duncan', 'matt']
	}

	let person1 = createAnthor(person)
	let person1SayHi = person1.sayHi()

	console.log('person1', person1SayHi)
})()

!(function () {
	/***
	 * 寄生组合式继承
	*/

	function object (o) {
		function F () {}
		F.prototype = o
		return new F()
	}

	function inheritPrototype (child, parent) {
		let o = object(parent.prototype)  		 // 创建对象
		o.constructor = child					 // 增强对象
		child.prototype = o						 // 指定对象
	}

	function Parent (name) {
		this.name = name
		this.colors = ['red', 'blue', 'green']
	}

	Parent.prototype.getName = function () {
		return this.name
	}

	function Child (name, age) {
		Parent.call(this, name)

		this.age = age
	}

	inheritPrototype(Child, Parent)			// 效率高，保证只调用一次Parent()构造函数

	Child.prototype.getAge = function () {
		return this.age
	}

	// demo
	let instance = new Child('Haines', 27)
	let name = instance.getName()
	let age = instance.getAge()

	console.log('name', name, 'age', age)

})()
