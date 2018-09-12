
require('@babel/polyfill')

for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log('a',new Date, i)
    }, 2000)
}

console.log('b', new Date, i)

export default a = '1'
