let debounce = function (fn, ms) {
    let timeout = 0
    let _this
    let args

    let wrap = function () {
        if (timeout) {
            clearTimeout(timeout)
        }

        // args = Array.from(arguments)
        args = [].slice.call(arguments)
        _this = this
        timeout = setTimeout( () => {
            timeout = 0
            fn.apply(_this, args)
        }, ms)
    }

    return wrap
}
