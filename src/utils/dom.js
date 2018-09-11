

export function on (node, event, fn) {
    node.addEventListener(event, fn, false)
}

export function off (node, event, fn) {
    node.removeEventListener(event, fn, false)
}

function once (node, event, fn) {
    node.addEventListener(event, function t (e) {
        e.target.removeEventListener(event, t, false)
        fn.apply(this || node, arguments || e)
    }, false)
}

export function once (node, event, fn) {

	let wrap = function () {
		off(node, event, wrap)
		fn.apply(this, arguments)
	}

    /***
     * 这里暴露wrap函数，便于扩展
    */
    wrap.fn = fn
    on(node, event, wrap)
}

export const requestFrame  = (function () {
	let raf = window.requestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			function (fn) {
				return window.setTimeout(fn, 16)
			}

	return function(fn) {
		return raf(fn)
	}
}())

export const cancelFrame = (function () {
	let cancel = window.cancelAnimationFrame ||
				window.mozCancelAnimationFrame ||
				window.webkitCancelAnimationFrame ||
				window.clearTimeout

	return function(id) {
		return cancel(id)
	}
}())
