import * as _ from 'lodash'
import { cat, construct } from '../utils'

!(function () {
	/***
	 * ⚠️ 这里babel会自动将这里的匿名函数转换为具名函数（名称同声明的变量）
	 * ⚠️ 在严格模式下，js访问arguments.callee这个属性会报错
	*/
	'use strict'
	let factorial = function (num) {
		if (num <= 1) {
			return 1
		} else {
			// return num * arguments.callee(num - 1)
			return num * factorial(num - 1)
		}
	}

	let ins = factorial(5)
	// console.log(ins)

})()

!(function () {
	/***
	 * ⚠️ 闭包所保存的是整个变量对象，而不是某个特殊的变量
	*/

	function createFunctions () {
		let result = new Array()

		for (var i = 0; i < 10; i++) {

			result[i] = (function (num) {
				return function () {
					return num
				}
			}) (i)
		}

		return result
	}

	let res = createFunctions()

	console.log('res', res[0](), res[1](), res[2]())


})()

!(function () {
	/***
	 * 函数提升
	*/

	function foo () {
		console.log('global foo')
	}
	function bar () {
		console.log('global bar')
	}

	function hoist () {
		/***
		 * ⚠️：变量的未声明和未定义，JS引擎处理结果都为undefined
		*/
		console.log(typeof foo) // function
		console.log(typeof bar) // bar is not defined

		foo() // local foo
		bar() // bar is not function.

		/**
		 * 函数声明
		 * 变量 'foo'以及其实现者被提升
		*/
		function foo () {
			console.log('local foo')
		}

		/**
		 * 函数表达式
		 * 只有变量'bar'被提升，函数实现并未提升
		*/
		let bar  = function () {
			console.log('local bar')
		}
	}

	// hoist()
})()

!(function () {
	/**
	 * 函数柯里化
	*/
	'use strict';

	var prefilters = {}

	function curry (structure) {

		return function (func) {
			structure['*'] = func
		}
	}

	var ajaxPrefilter = curry(prefilters)

	ajaxPrefilter(function (options) {
		return {
			send: function (){

			},
			callback: function () {

			}
		}
	})

	console.log('prefilters', prefilters)
})()

!(function () {
	/***
	 * 惰性函数定义(lazy function definition)
	 * -> 通过改变指针foo的指向，达到只执行一次函数的目的
	 *
	*/
	let foo = function () {
		let a = 'old scope chain'
		console.log('boo')
		foo = function () { // 覆盖旧函数
			console.log('double boo:', a) // scope chain
		}
	}
	foo.property = 'property'

	let bar = foo // 将bar指针指向第一个foo定义时堆中的位置
	let sky = {
		boo: foo
	}

	bar() // 'boo'
	bar() // 'boo'
	console.log(bar.property) // 'property'

	sky.boo() // 'boo'
	sky.boo() // 'boo'
	console.log(sky.boo.property) // 'property'

	foo() // 'double boo'
	foo() // 'double boo'
	console.log(foo.property) // 'undefined'
})()

!(function () {
	/**
	 * 即时对象初始化
	*/
	({
		name: 'hianes',
		age: 27,
		goal: 'web developer',
		getInfo () {
			return `${this.name} age is ${this.age} and his goal is to be a good ${this.goal}`
		},
		init () {
			console.log(this.getInfo())
			// TODO
		}
	}).init()
})()

!(function () {
	/***
	 * 闭包中的实例
	 * 缺点：在实例化后所有定义在初始构造函数原型上的属性都会丢失
	*/

	function Person () {
		let instance = this

		this.name = 'haines'
		this.age = 27

		Person = function () {
			console.log('second')
			return instance
		}
	}

	// let ins1 = new Person()
	// let ins2 = new Person()
	// console.log(ins1 === ins2) // true

	Person.prototype.nothing = true // 在实例化之前定义，Person的指针没有变化
	let ins3 = new Person()
	Person.prototype.everything = true // 实例化之后定义，Person的指针已经变化
	let ins4 = new Person() // 重定义的Person构造函数

	console.log(ins3.nothing) // true
	console.log(ins4.nothing) // true
	console.log(ins3.everything) // undefined
	console.log(ins4.everything) // undefined

	console.log(ins3.constructor.name) // Person
	console.log(ins3.constructor === Person) // false,注意 这里的Person指向的是原始定义的构造函数的位置

	// 可以通过IIFE达到预期目的
	let Foo
	!(function() {
		let instance
		Foo = function Foo () {
			if (instance) {
				return instance
			}
			instance = this

			this.name = 'haines'
			this.age = 27
		}

	})()
})()

!(function () {

	/***
	 * 递归
	 * 图遍历-深度优先
	*/
	let influences = [
		['Lisp', 'Smalltalk'],
		['Lisp', 'Scheme'],
		['Smalltalk', 'Self'],
		['Scheme', 'JavaScript'],
		['Scheme', 'Lua'],
		['Self', 'Lua'],
		['Self', 'JavaScript']
	]

	function nexts (graph, node) {
		if (_.isEmpty(graph)) {
			return []
		}

		let pair = _.head(graph)
		let more = _.tail(graph)
		let from = _.head(pair)
		let to = _.last(pair)

		if (_.isEqual(node, from)) {
			return construct(to, nexts(more, node))
		} else {
			return nexts(more, node)
		}
	}

	function depthSearch(graph, nodes, seen) {
		if (_.isEmpty(nodes)) {
			return seen
		}

		let node = _.head(nodes)
		let more = _.tail(nodes)

		if (_.includes(seen, node)) {
			return depthSearch(graph, more, seen)
		} else {
			let temp = _.flattenDeep(cat(nexts(graph, node), more))
			let temp2 = _.flattenDeep(construct(node, seen))

			return depthSearch(graph, temp, temp2)
		}
	}

	// let depthSearchResult = _.reverse(depthSearch(influences, ['Lisp'], []))
	// let depthSearchResult = _.reverse(depthSearch(influences, ['Smalltalk', 'Self'], []))
	let depthSearchResult = _.reverse(depthSearch(cat(['Lua', 'Io'], influences), ['Lisp'], []))
	console.log(depthSearchResult)

})()

!(function () {

})()
