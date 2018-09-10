(function(){
    'use strict';

    function deepClone(obj) {
        // var type = Object.prototype.toString.call(obj).split(/\s+/g)[1].replace(']',''),
        var type = Object.prototype.toString.call(obj).slice(8, -1),
            result
        /*
        *
        * 可检测类型
        * Object, Array, Number, String, Boolean, RegExp, Function, Date, Symbol, Math, Error, Undefined, Null
        */
        switch (type) {
            case 'Object':
                result = {}
                for (var i in obj) {
                    if (obj.hasOwnProperty(i)) {
                        result[i] = deepClone(obj[i])
                    }
                }
            case 'Array':
                result = [] 
                for (var i = 0, len = obj.len; i < len; i++) {
                    if (obj.hasOwnProperty(i)) {
                        result[i] = deepClone(obj[i])
                    }
                }
                break
            default:
                result = obj
                break
        }

        return result

    }

    var instance = {a:'aa', b: {d: false, f: {a: ['1', '2', '3']}}, c:124, g:Symbol('symble'), h: new Date(), i: /\s+/g, k: () => {return 1}, l: new Error('error'), m: Math}
    var s = deepClone(instance)
    instance.a = 'bb'
    console.log('a', instance)
    console.log('s', s)
}())