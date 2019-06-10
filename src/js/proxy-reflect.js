let obj = new Proxy({}, {
    get (target, key, receiver) {
        console.log(`get ${key}`)
    },
    set (target, key, value, receiver) {
        console.log(`set ${key}`)

        return Reflect.set(target, key, value, receiver)
    }
})

obj.count = 1

++obj.count

let foo = new Proxy({}, {
    get (target, property) {
        return 35
    }
})

let fins = Object.create(foo)

fins.time
foo.time


const p = new Proxy(() => 'I am the target', {
    apply(target, ctx, args) {
        // return Reflect.apply(...arguments)
        return 'I am the proxy'
    }
})

p()