(function () {
    'use strict';

    var Emitter = function () {
        if (!this.hasOwnProperty('_events')) {
            this._events = {}
        }
    }

    Emitter.prototype = {
        on (event, fn, scope) {
            if (!fn) {
                console.error('error handler')
            }

            var events = this._events[event] || (this._events[event] = [])

            events.push({
                fn: fn,
                scope: scope || null
            })

            return this
        },
        off (event, fn) {
            if (!fn) {
                console.error('error handler')
            }

            var events = this._events[event]

            if (!events) return this

            if (arguments.length === 1) {
                delete this._events[event]

                return this
            }

            var cb
            for (var i = 0, cb, l = events.length; i < l; i++) {
                cb = events[i]

                if (cb === fn || cb.fn === fn) {
                    events.splice(i, 1)
                    break
                }
            }

            return this
        },
        once(event, fn) {
            var self = this

            function on () {
                self.off(event, on)
                fn.apply(this, arguments)
            }

            this.on(event, on, this)
            return this
        },
        emit(event) {
           var args = [].slice.call(arguments, 1)
           var events = this._events[event]

           if (events) {
               events = events.slice(0)

               console.log('events', events)

               for (var i = 0, len = events.length; i < len; ++i) {
                    events[i].fn.apply(this, args)
               }
           }

           return this
        }
	}

    var emmiter = new Emitter()

    function handler () {
        console.log('arguments', arguments)
    }

    emmiter.on('event', handler, this)
	emmiter.emit('event', 'hihao')
} ())
