class Emitter {
	constructor () {
		if (!this.hasOwnProperty('_events')) {
			this._events = {}
		}
	}

	on (event, fn, ctx) {
		if (!fn) {
			console.error('Error handler')
		}

		let events = this._events[event] || (this._events[event] = [])

		events.push({
			fn: fn,
			ctx: ctx
		})

		return this // 链式
	}

	off (event, fn) {
		if (!fn) {
			console.error('Error handler')
		}

		let events = this._events[event]

		if (!events) {
			return this
		}

		if (arguments.length === 1) {
			delete this._events[event]

			return this
		}

		for (let i = 0, cb = null, len = events.length; i < len; i++) {
			cb = events[i]

			if (cb === fn || cb.fn === fn) {
				events.splice(i, 1)
				break
			}
		}

		return this
	}

	once (event, fn) {
		let wrap, ctx = this

		wrap = function () {
			ctx.off(event, wrap)
			fn.apply(this, arguments)
		}

		this.on(event, wrap, this)
	}

	/**
	 * trigger an event
	 * */
	emit (event) {
		let args = [].slice.call(arguments, 1)
		let events = this._events[event]

		if (events) {
			events = events.slice(0)

			for (let i = 0, len = events.length; i < len; i++) {
				events[i].fn.apply(this, args)
			}
		}

		return this
	}
}


var emmiter = new Emitter()

function handler (e) {
	console.log('arguments', e)
}

emmiter.on('event', handler, this)
emmiter.emit('event', 'hihao').emit('event', 'ceshi')
