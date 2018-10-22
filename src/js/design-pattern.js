!(function () {
	/***
	 * 单体模式(singleton)
	 * 别名：模块模式(module pattern)
	 * 适用场景：
	 * -> 组织代码，便于维护
	 * -> 优化：将开销较大却很少使用的组件包装到惰性单体中；针对特定环境的代码包装到分支型单体中
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

		function privateAge () { 			// private method
			return privateAge
		}

		return {
			getPrivateName () {				// public method, access private property
				return privateName
			},
			publicMethod (arg) {			// public method
				return `${arg}-${privateGoal}-${privateAge()}`
			}
		}
	})()

	// 3,惰性加载单体
	NameSpace.Singleton3 = (function () {
		let uniqueInstance

		function constructor () {
			let privateName = 'Bob' 			// private property
			let privateAge = 27					// private property
			let privateGoal = 'be an artist'	// private property

			function privateAge () { 			// private method
				return privateAge
			}

			return {
				getPrivateName () {				// public method, access private property
					return privateName
				},
				publicMethod (arg) {			// public method
					return `${arg}-${privateGoal}-${privateAge()}`
				}
			}
		}

		return {
			getInstance () {
				if (!uniqueInstance) {
					uniqueInstance = constructor()
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
	*/
})()

!(function () {
	/***
	 * 桥接模式
	*/
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
	 * 观察者模式
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
