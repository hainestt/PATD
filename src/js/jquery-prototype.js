(function () {
    'use strict'

    var assign = function (obj, src) {
        if (src) {
            for (var name in src) {
                if (src.hasOwnProperty(name)) {
                    obj[name] = src[name]
                }
            }
        }
    }


    var Emitter = function () {
        if (!this.hasOwnProperty('_events')) {
            this._events = {}
        }
    }
    
    Emitter.prototype = {
        on: function (name, handler, scope) {
            
            if (!handler) {
                console.error('error')
            }
    
            var events = this._events[name] || (this._events[name] = [])
    
            events.push({
                handler: handler,
                scope: scope || null
            })

            // console.log('emmit.on_this', this)
    
            return this
        },
        trigger: function (name) {
            var events = this._events[name]
            if (events) {
                var args = Array.from(arguments).slice(1)
                // var args = arguments[1]

                for (var i = 0; i < events.length; i++) {
                    var event = events[i]

                    if (event.once === true) {
                        events.splice(i--, 1)
                    }
                    event.handler.apply(event.scope, args)
                }
            }
        }
    }

    var hQuery = function (selector, context) {

        var instance = new hQuery.prototype.init(selector, context)

        return instance
    }

    hQuery.prototype = {
        // __proto__: Emitter.prototype,
        age: 20,
        init: function () {
            Emitter.call(this)
            this.age = 18
            return this
        },
        name: function () {}
    }

    var a = new hQuery()
    console.log('a', a)

    hQuery.prototype.init.prototype = hQuery.prototype
    // Object.setPrototypeOf(hQuery.prototype, Emitter.prototype) // 同上面的__proto__
    assign(hQuery.prototype, Emitter.prototype) // 同Object.assign, 兼容__proto__, setPrototypeOf写法
    // hQuery.prototype = Object.create(Emitter.prototype)

    console.log('hQuery.prototype', hQuery.prototype)

    /****
     * Instance
     */
    function handlerFn1 () {
        console.log('event emmit fitst handler')
    }

    function handlerFn2 () {
        console.log('event emmit second handler')
    }

    var hInstance = hQuery('haines')
    
    hInstance.on('emmit', handlerFn1, self)
    hInstance.on('emmit', handlerFn2, self)
    
    hInstance.trigger('emmit')

} ())


