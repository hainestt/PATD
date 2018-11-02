/***
 * demo1
 * 函数调用里的this
*/

!(function(){
    // 'use strict';

    function foo (num) {
        console.log('foo ', num)

        console.log('this ', this)

        this.counter++
    }

    foo.counter = 0

    for (var i = 0; i < 10; i++) {
        if (i > 5) {
            // foo(i)
        }
    }

    /***
     * 非严格模式下为 0, 因为this.couter++中的this指向的是window对象，而不是foo；
     * 严格模式下this为undefined
    */
    console.log(foo.counter)
})()

/***
 * demo2
 * new foo 里的this
*/

!(function() {
    // 'use strict';

    function foo (num) {
        console.log('foo ', num)
        console.log('this ', this)

        this.counter ++
    }

    foo.counter = 0

    for (var i = 0; i < 10; i++) {
        if (i > 5) {
            // let ins = new foo (i)
            // ins.counter = i
        }
    }

    /***
     * 1，结果仍然为0，虽然这里的this指向了foo, 但ins是foo的一个实例，而counter是foo的一个属性，ins上没有定义这个属性
     * 2，无论严格模式还是非严格模式都不影响结果foo.counter的值
     * 3，回顾一下new foo发生了什么：
     *  3.1 构造一个全新的对象
     *  3.2 将this指向这个对象
     *  3.3 执行构造函数里的代码
     *  3.4 返回新对象
    */

    console.log(foo.counter)
})()

/**
 * demo3
 * call解决this指向问题；强制this指向foo函数对象
*/

!(function () {

    function foo (num) {
        console.log('foo ', num)
        console.log('this ', this)

        this.counter ++
    }

    foo.counter = 0

    for (var i = 0; i < 10; i++) {
        if (i > 5) {
            foo.call(foo, i)
        }
    }

    console.log(foo.counter)

})()

/***
 * demo4
 * 变量赋值中的this
*/
!(function () {
	// 'use strict'
	let bind = function (ctx, fn) {
		return function() {
			return fn.apply(ctx, arguments)
		}
	}

	let one = {
		name: 'haines',
		say (greet) {
			console.log( `${greet}, ${this.name}` )
		}
	}

	let two = {
		name: 'rock'
	}

	//
	// one.say.apply(two, ['Hello'])

	//
	// 给变量赋值
	// let say = one.say // this指向全局
	let say = bind(two, one.say) // 改变this指向为two对象
	say('Hello')

	//
	// 作为回调函数传递
	let three = {
		name: 'bob',
		method (cb) {
			return cb('Hi')
		}
	}

	three.method(one.say) // Hi, undefined
	three.method(bind(two, one.say)) // Hi, rock

})()
