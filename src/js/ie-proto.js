

Object.setPrototypeOf = Object.setPrototypeOf || function(obj, proto) {
    if (!isIE9) {
        obj.__proto__ = proto
    } else {
        for (var prop in proto) {
            obj[prop] = proto[prop]
        }
    }
    return obj
}

var isIE9 = function () {
    return navigator.appVersion.indexOf('MSIE 9') > 0
}