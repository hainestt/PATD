

/** 
 * Object.create
*/

function Parent () {
    this.x = 1
    this.y = 2

    this.foo = function () {
        return 'foo'
    }
}

Parent.prototype.move = function (x, y) {
    this.x += x
    this.y += y
    console.info('Parent moved.')
}

function Child () {
    console.log('this-before call', this)

    Parent.call(this)

    console.log('this-after-call', this)
}

/** 
 * call()
 * 原型继承
*/
// Child.prototype.move = function () {
//     Parent.prototype.move.call(this)
// }

/** 
 * Object.create()
 * 对象原型继承
*/
// Child.prototype = Object.create(Parent.prototype)
// Child.prototype.constructor = Child

// console.log('Child.prototype->', Child.prototype.constructor )

let ins = new Child()

console.log('ins:', ins, '\n')

/*** 
 * new 实例的 __proto__ 指向的是原型对象
*/
console.log('ins.__proto__ === Child.prototype:', ins.__proto__ === Child.prototype, '\n')

console.log('Object.getPrototypeOf(ins):', Object.getPrototypeOf(ins))
console.log('Object.getPrototypeOf(ins.__proto__):', Object.getPrototypeOf(ins.__proto__))
console.log('Object.getPrototypeOf( Child.prototype):', Object.getPrototypeOf(Child.prototype))
console.log('Object.getPrototypeOf(ins) === ins.__proto__:', Object.getPrototypeOf(ins) === ins.__proto__)
console.log('Object.getPrototypeOf(ins) === Child.prototype:', Object.getPrototypeOf(ins) === Child.prototype, '\n')

console.log('Child.prototype.__proto__ :', Child.prototype.__proto__)

console.log('Object.getPrototypeOf(Child): ',Object.getPrototypeOf(Child), '\n')

/***  
 * 构造函数的prototype指向的是原型对象
*/
console.log('Child.prototype:', Child.prototype)
console.log('Object.getPrototypeOf(Child.prototype): ',Object.getPrototypeOf(Child.prototype))
console.log('Object.getPrototypeOf(Child.prototype.__proto__): ',Object.getPrototypeOf(Child.prototype.__proto__), '\n')

console.log('Child.prototype.__proto__ === Object.prototype:', Child.prototype.__proto__ === Object.prototype)
console.log('Child.prototype.__proto__ === ({}).__proto__:', Child.prototype.__proto__ === ({}).__proto__)
console.log('Child.prototype.__proto__ === Parent.prototype:', Child.prototype.__proto__ === Parent.prototype, '\n')

/*** 
 * 原型对象的constructor指向了构造函数本身
*/
console.log('Object.getPortotyeOf(Child.prototype.constructor)', Object.getPrototypeOf(Child.prototype.constructor))
console.log('Object.getPortotyeOf(Child)', Object.getPrototypeOf(Child))
console.log('Child.prototype.constructor === Child:', Child.prototype.constructor === Child)

console.log('ins Child', ins instanceof Child)
console.log('ins Parent', ins instanceof Parent)
// ins.move(1,1)