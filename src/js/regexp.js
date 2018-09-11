
/** 
 * RegExp.$1~$9
 * 匹配括号项。非标准，不建议生产环境使用
*/

let reg = /(\w+)\s(\w+)/
let str = 'haines tao'

str.replace(reg, '$2, $1')

let r0 = RegExp.$1
let r1 = RegExp.$2

console.log('r0', r0)
console.log('r1', r1)