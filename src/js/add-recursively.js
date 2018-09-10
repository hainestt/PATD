Object.prototype.each = function (callback) {
    let i = 0, len
    
    if (this.hasOwnProperty('length') && this.length && Object.prototype.toString.call(this).slice(8, -1) === 'Array') {
        len = this.length

        for (; i < len; i++) {
            if (callback.call(i, this[i], this[i]) === false) {
                break
            }
        }
    } else {
        for (i in this) {
            if (callback.call(this[i], i, this[i]) === false) {
                break
            }
        }
    }

    return this
}

var list = []
var add = function () {
    ( function add( args ) {
        debugger
        
        [].slice.call(args).each((item, i, arr) => {
            debugger
            if (Object.prototype.toString.call(item).slice(8, -1) === 'Function') {
                list.push(item)
            } else if (item && item.length && Object.prototype.toString.call(item).slice(8, -1) !== 'String') {
                add(item)
            }
        })
    } )( arguments )
}

let f1 = function () {}
let f2 = function () {}
let f3 = function () {}
let f4 = function () {}
let f5 = [{a: function (){}, b: function (){} }]
let f6 = 'test'

add(f5)

console.log('list', list)

