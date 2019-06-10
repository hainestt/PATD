function sleep (delay) {
    let start = Date.now()
    while(Date.now() - start < delay) {
        continue
    }
}
function get() {
    sleep(3000)
    return Math.random() * 100 + 1000
}

async function foo() {
    console.log('----begin-----')
    console.time('start')
    let data = await get()
    console.log('end data:', data)
    console.timeEnd('start')
}

foo()
