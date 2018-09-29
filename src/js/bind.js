/** 
 * 硬绑定
 * 这里模拟简单的ES5引入的原生Function.prototype.bind方法
 * 原生的bind方法效率更高，建议使用原生bind
*/

export function bind (fn, ctx) {
    return function () {
        return fn.apply(ctx, arguments)
    }
}

/*** 
 * 软绑定
*/

if (!Function.prototype.softBind) {
    Function.prototype.softBind = function (obj) {
        var fn = this
        var curried = [].slice.call(arguments, 1)

        var bound = function () {
            return fn.apply(
                (!this || this === (window || global)) ? 
                obj : this,
                curried.concat.apply(curried, arguments)
            )
        }

        bound.prototype = Object.create(fn.prototype)
        return bound
    }
}

