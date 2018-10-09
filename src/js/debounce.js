/**
 * debounce test
*/

import { debounce, debounceImmediate } from '../utils'

!(function () {
	let form  = document.querySelector('form')
	let input = form.debounce
	let label = document.querySelector("input[name='debounce']+label")

	let count = 0
	let handler = function(event) {
		let evt = window.event || event
		let target = evt.target || evt.srcElement
		count ++
		console.log('e-target', evt, target)

		label.innerText = `${count}`
	}

	input.addEventListener('input', debounceImmediate(handler, 10000, true), false)
	// input.addEventListener('input', debounce(handler, 2000), false)
	// input.addEventListener('input', handler, false)

})()
