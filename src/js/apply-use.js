
/** 
 * array push
*/

let a = [1,2,3,4]
let b = [5,6,7]

Array.prototype.push.apply(a, b) // a = [1,2,3,4,5,6,7]



function Foo (definition) {
    if (typeof definition === 'function') {
        this._update = definition
    }
}

Foo.prototype.update = function (value) {
    value += value

    this.value = value

    this.apply(value)

}

Foo.prototype.apply = function (value) {
    this._update(value)
}

/** 
 * 暴露一个函数来处理更新后的value
*/
let handler = function (value) {
    console.log('value: ', value)
}

let ins = new Foo(handler)

ins.update('hello')

console.log(ins)
