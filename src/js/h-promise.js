'use strict';

/**
 * setImmediate(fn): 将函数fn放在队尾，等到下一个tick执行
 * setTimeout(fn,ms): ms，延迟毫秒数，可省略，省略时默认为0
 * 深入理解定时器机制，参考：http://www.laruence.com/2009/09/23/1089.html
*/


let cycle

const toString  = ({}).toString

const timer = (typeof setImmediate !== 'undefined') ?
				function timer(fn) {return setImmediate(fn)} :
				setTimeout

const defineProto = function(obj, name, val, config) {
	return Object.defineProperty(obj, name, {
		value: val,
		writable: true,
		configurable: config !== false
	})
}

const queue = (function() {
	var first, last, item

	function Item(fn, self) {
		this.fn = fn
		this.self = self
		this.next = void 0
	}

	return {
		add (fn, self) {
			item = new Item(fn, self)

			/***
			 * first -> item0
			 * item0.next -> item1
			 * item1.next -> item2
			 * ...
			 * item(n-1).next -> item(n)
			 * last -> item(n-1)
			*/
			if (last) {
				last.next = item
			} else {
				first = item
			}

			last = item
			item = void 0
		},
		drain () {
			let f = first
			first = last = cycle = void 0

			while(f) {
				f.fn.call(f.self)
				f = f.next
			}
		}
	}
})()

const schedule = function (fn, self) {
	queue.add(fn, self)

	/**
	 * 将优先出列的函数放到执行线程的队尾
	*/
	if (!cycle) {
		cycle.timer(queue.drain)
	}
}

const isThenable = function (o) {
	let then
	let type = typeof o

	if (!!o && (type == 'object' || type == 'function')) {
		then = o.then
	}

	return typeof then == 'function' ? then : false
}

