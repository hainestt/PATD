/**
 * 不触发第一次调用
 * @param {* Function} fn 
 * @param {* Number} ms 
 */

var lazyThrottle = function (fn, ms) {
    var timeout = 0,
        args,
        scope
    
    var newTimeout = function () {
        timeout = setTimeout(function () {
            timeout = 0

            if (args) {
                fn.apply(scope, args)
                newTimeout()
                scope = null
                args = null
            }
        }, ms)
    }

    var wrap = function () {
        scope = this
        if (Array.from) {
            args = Array.from(arguments)
        } else {
            args = [].slice.call(arguments)
        }

        if (!timeout) {
            newTimeout()
        }
    }

    return wrap
}

