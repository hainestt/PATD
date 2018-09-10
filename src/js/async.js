function generateArr(num = 100){
    // console.time('array generate')
    // let arr = Array.from(Array(num)).map((item, i, arr) => {
    //     return parseInt(Math.random() * arr.length)
    // })
    // console.timeEnd('array generate')
    // return arr

    // setTimeout(_ => {
    //     console.log('array')
    // }, 0)

    return new Promise((resolve, reject) => {
        resolve('sss')
    })

}

function getSomething (str) {
    console.log('str from v1', str)
}

async function test() {
    let v1 
    try {
        v1 = await generateArr(1000000)
    } catch(e) {
        console.error(e)
    }

    const v2 = getSomething(v1)
}

test()

// const result = testAsync()
// console.log(result)

// testAsync().then(v => {
//     console.log(v)
// })