
// Object.prototype.extend = function () {
//     var target = arguments[0] || {}

//     console.log('target', target)
// }

// var objs = {a:'testa'}

// objs.extend({b:'testb'})



var test = function (cb, num) {
    var i = 0

    var fn = function () {
        i++
        cb(i + num)
    }

    return fn
}

// setTimeout(test(2), 1000)


function *create() {
    debugger
    let f = yield 1; 
    let s = yield f + 2; 
    yield s + 3
}