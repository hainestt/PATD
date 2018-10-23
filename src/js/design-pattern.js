import { on } from '../utils'

!(function () {
	/***
	 * 单体模式(singleton)
	 * 别名：模块模式(module pattern)
	 * 适用场景：
	 * -> 组织代码，便于维护
	 * -> 优化：将开销较大却很少使用的组件包装到惰性单体中；针对特定环境的代码包装到分支型单体中
	 *
	 * 优点：
	 * 1，使用命名空间，减少全局变量的数量
	 * 2，代码组织一致，便于维护
	 * 3，可被实例化，且实例化一次
	*/

	// 1,基本结构
	let NameSpace = {} // 起着命名空间的作用
	NameSpace.Singleton = {
		name: 'Haines',
		age: 27,
		goal: 'be a good web developer',
		getGoal () { 						// public method
			return this.goal
		},
		_stripSpace (str) { 				// private method,just define that, actually is a public method
			return String(str).replace(/\s+/, '')
		}
	}

	// 2,使用闭包创建私有成员
	NameSpace.Singleton2 = (function () {
		let privateName = 'Bob' 			// private property
		let privateAge = 27					// private property
		let privateGoal = 'be an artist'	// private property

		function getPrivateAge () { 			// private method
			return privateAge
		}

		return {
			getPrivateName () {				// public method, access private property
				return privateName
			},
			publicMethod (arg) {			// public method
				return `${arg}-${privateGoal}-${getPrivateAge()}`
			}
		}
	})()

	// 3,惰性加载单体，并进行单次实例化
	NameSpace.Singleton3 = (function () {
		let uniqueInstance

		function Constructor () {
			let privateName = 'Bob' 			// private property
			let privateAge = 27					// private property
			let privateGoal = 'be an artist'	// private property

			function getPrivateAge () { 			// private method
				return privateAge
			}

			return {
				getPrivateName () {				// public method, access private property
					return privateName
				},
				publicMethod (arg) {			// public method
					return `${arg}-${privateGoal}-${getPrivateAge()}`
				}
			}
		}

		return {
			getInstance () {
				if (!uniqueInstance) {
					uniqueInstance = new Constructor()
				}

				return uniqueInstance
			}
		}
	})()
	// NameSpace.Singleton3.getInstance().publicMethod()

	// 4,分支型单体
	NameSpace.Singleton4 = (function (condition) {
		let person1 = {
			name: 'Haines',
			age: 27,
			goal: 'be a good web developer',
			getPersonInfo () {
				return `${this.name}'s age is ${this.age}, and his goal is to ${this.goal}`
			}
		}

		let person2 = {
			name: 'Bob',
			age: 26,
			goal: 'be an artist',
			getPersonInfo () {
				return `${this.name}'s age is ${this.age}, and his goal is to ${this.goal}`
			}
		}

		return condition === 'Haines' ? person1.getPersonInfo() : person2.getPersonInfo()

	})(name = 'Haines')


})()

!(function () {
	/***
	 * 工厂模式
	 * 描述：工厂是一个将成员对象的实例化推迟到子类中进行的类
	 * 适用场景：
	 * 1，对象或组件有较高的复杂度
	 * 2，在同一环境中需要简单的生成不同对象依赖的实例
	 * 3，在处理很多共享相同属性的对象或组件时
	 * 4，去耦合
	 *
	*/

	function Person1 (...options) {
		options = options[0]

		this.name = options.name || 'Haines'
		this.age = options.age || 27
		this.goal = options.goal || 'be a good web developer'
	}

	function Person2 (...options) {
		options = options[0]

		this.name = options.name || 'Bob'
		this.age = options.age || 26
		this.goal = options.goal || 'be an artist'
	}

	let PersonFactory = function () {} // 创建人物工厂

	// 默认personClass是Person1
	PersonFactory.prototype.personClass = Person1

	// 工厂方法创建新的Person实例
	PersonFactory.prototype.createPerson = function(...options) {
		options = options[0]

		switch(options.personType) {
			case 1:
				this.personClass = Person1
				break
			case 2:
				this.personClass = Person2
				break
		}

		// 这里使用工厂方法将实例化代码集中在一个位置
		return new this.personClass(options)
	}

	//创建工厂实例
	let insFactory = new PersonFactory()
	let ins = insFactory.createPerson({
		personType: 2,
		name: 'Rock',
		goal: 'be a singer'
	})

	console.log('ins', ins)


})()

!(function () {
	/***
	 * 观察者模式
	 * 描述：该模式定义了一种一对多的依赖关系，让多个观察者对象同时监听一个主题对象。这个主题对象在状态上发生变化时，会通知所有观察者，使它们能够自动更新自己
	*/

	// 观察者对象
	function Observer () {
		this.update = function (ctx) { // 此方法必须被实现
			console.log('ctx:', ctx)
		}
	}

	function ObserverList () {
		this.observerList = []
	}

	ObserverList.prototype = {
		add (obj) {
			return this.observerList.push(obj)
		},
		count () {
			return this.observerList.length
		},
		get (index) {
			if (index > -1 && index < this.observerList.length) {
				return this.observerList[index]
			}
		},
		indexOf (obj, startIndex) {
			let i = startIndex
			let len = this.observerList.length

			while(i < len) {
				if (this.observerList[i] === obj) {
					return i
				}
				i++
			}
			return -1
		},
		removeAt (index) {
			this.observerList.splice(index, 0)
		}
	}


	// 主题对象
	function Subject () {
		this.observers = new ObserverList()
	}

	Subject.prototype = {
		addObserver (observer) {
			this.observers.add(observer)
		},
		removeObserver (observer) {
			this.observers.removeAt(this.observers.indexOf(observer, 0))
		},
		notify (context) {
			let observerCount = this.observers.count()

			for (let i = 0; i < observerCount; i++) {
				this.observers.get(i).update(context)
			}
		}
	}

	// 扩展接口
	function extend(source, target) {
		for (let key in target) {
			source[key] = target[key]
		}
	}

	/**
	 * Demo
	*/
	let checkbox = document.querySelector('.main-checkbox')
	let btn = document.querySelector('.add-new-observer')
	let wrap = document.querySelector('.oberser-container')

	extend(checkbox, new Subject())
	// 发布者的实现
	on(checkbox, 'click', function () {
		checkbox.notify(checkbox.checked)
	})
	// 订阅者的实现
	on(btn, 'click', function () {
		let newCheckbox = document.createElement('input')
		newCheckbox.type = 'checkbox'

		extend(newCheckbox, new Observer())

		newCheckbox.update = function (value) { // 复写Observer方法
			this.checked = value
		}

		checkbox.addObserver(newCheckbox)

		wrap.appendChild(newCheckbox)
	})



})()

!(function () {
	/***
	 * 组合模式
	*/
})()

!(function () {
	/***
	 * 门面模式
	*/
})()

!(function () {
	/***
	 * 适配器模式
	*/
})()

!(function () {
	/***
	 * 装饰者模式
	*/
})()

!(function () {
	/***
	 * 亨元模式
	*/
})()

!(function () {
	/***
	 * 代理模式
	*/
})()

!(function () {
	/***
	 * 命令模式
	*/
})()

!(function () {
	/***
	 * 职责链模式
	*/
})()
