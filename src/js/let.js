
// require('@babel/polyfill')
// import a from './test'

let utils = require('../utils')

console.log('utils', utils)

import { on } from '../utils'

console.log('on', on)

// let a = 2

const b = 3


// console.log('a', a)
console.log('b', b)

let arrow = () => {return 'aa'}
console.log('arrow', arrow)

let promise = Promise.resolve().then(() => {console.log('sss')})

let c = [1,2,3,4,5].includes(2)

