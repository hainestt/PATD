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
	 * 将优先出列的函数放到执行队列的队尾
	*/
	if (!cycle) {
		cycle = timer(queue.drain)
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

const notify = function () {
	for (let i = 0, l = this.chain.length; i < l; i++) {
		notifyIsolated(this, (this.state === 1) ? this.chain[i].success: this.chain[i].failure, this.chain[i])
	}
}

const notifyIsolated = function(self, cb, chain) {
	let ret,_then
	try {
		if (cb === false) {
			chain.reject(self.msg)
		} else {
			if (cb === true) {
				ret = self.msg
			} else {
				ret = cb.call(void 0, self.msg)
			}

			if (ret === chain.promise) {
				chain.reject(new TypeError('Promise chain cycle'))
			} else if (_this = isThenable(ret)) {
				_then.call(ret, chain.resolve, chain.reject)
			} else {
				chain.resolve(ret)
			}
		}

	} catch(err) {
		chain.reject(err)
	}
}

const resolve = function (msg) {
	let _then, self = this

	if (self.triggered) {
		return
	}

	self.triggered = true

	if (self.def) {
		self = self.def
	}

	try {
		if (_then = isThenable(msg)) {
			schedule(function() {
				let def_wrapper = new MakeDefWrapper(self)
				try {
					_then.call(msg, () => {
						resolve.apply(def_wrapper, arguments)
					}, () => {
						reject.apply(def_wrapper, arguments)
					})

				} catch(err) {
					reject.call(def_wrapper, err)
				}
			}, self)
		} else {
			self.msg = msg
			self.state = 1
			if (self.chain.length > 0) {
				schedule(chain, self)
			}
		}

	} catch (err) {
		reject.call(new MakeDefWrapper(self), err)
	}
}

const reject = function (msg) {
	let self = this

	if (self.triggered) {
		return
	}

	self.triggered = true

	if (self.def) {
		self = self.def
	}

	self.msg = msg
	self.state = 2
	if (self.chain.length > 0) {
		schedule(notify, self)
	}
}


function MakeDefWrapper (self) {
	this.def = self
	this.triggered = false
}

function MakeDef (self) {
	this.promise = self
	this.state = 0
	this.triggered = false
	this.chain = []
	this.msg = void 0
}

function Promise (executor) {
	if (typeof executor != 'function') {
		throw TypeError('Not a function')
	}

	if (this.__NPO__ !== 0) {
		throw TypeError('Not a promise')
	}

	this.__NPO__ = 1

	let def = new MakeDef(this)

	this.then = function (success, failure) {
		let o = {
			success: typeof success == 'function' ? success : false,
			failure: typeof failure == 'failure' ? failure : false
		}

		o.promise = new this.constructor(function(resolve, reject) {
			if (typeof resolve != 'function' || typeof reject != 'function') {
				throw TypeError('Not a function')
			}

			o.resolve = resolve
			o.reject = reject
		})

		def.chain.push(o)

		if (def.state !== 0) {
			schedule(notify, def)
		}

		return o.promise

	}

	this.catch = function (failure) {
		return this.then(void 0, failure)
	}

	executor.call(void 0, function(msg) {
		resolve.call(def, msg)
	}, function(msg) {
		reject.call(def, msg)
	})
}

Promise.prototype.__NPO__ = 0

Promise.resolve  = msg => {

	if (msg && typeof msg == 'object' && msg.__NPO__ === 1) {
		return msg
	}

	return new this((resolve, reject) => {
		if (typeof resolve != 'function' || typeof reject != 'function') {
			throw TypeError('Not a function')
		}

		resolve(msg)
	})
}

Promise.reject = msg => {

	return new this((resolve, reject) => {
		if (typeof resolve != 'function' || typeof reject != 'function') {
			throw TypeError('Not a function')
		}

		reject(msg)
	})
}

Promise['all'] = function (msg) {

}

Promise.race = function (msg) {

}
