
let hasFocus = document.hasFocus()
let activeElement = document.activeElement
let hasMouseEventsFeatue = document.implementation.hasFeature('MouseEvents', '2.0')

console.log('document.hasFocus', hasFocus)
console.log('document.activeElement', activeElement)
console.log('eventFeature:', hasMouseEventsFeatue)
