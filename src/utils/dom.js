

export function on (node, event, fn) {
    node.addEventListener(event, fn, false)
}

export function off (node, event, fn) {
    node.removeEventListener(event, fn, false)
}

export function once1 (node, event, fn) {
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

 /***
  * 窗口可视范围的高度
  */
export function getClientHieght () {
    let clientHeight = 0

    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight
    } else {
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight
    }

    return clientHeight
}

/**
 * 窗口滚动条高度
*/
export function getScrollTop () {
    let scrollTop=0

    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop
    } else if (document.body){
        scrollTop = document.body.scrollTop
    }
    return scrollTop
}

/***
 * 文档内容实际高度
*/
export function getDomHeight () {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
}

/***
 * requestAnimationFrame
*/
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

/***
 * cancelAnimationFrame
*/
export const cancelFrame = (function () {
	let cancel = window.cancelAnimationFrame ||
				window.mozCancelAnimationFrame ||
				window.webkitCancelAnimationFrame ||
				window.clearTimeout

	return function(id) {
		return cancel(id)
	}
}())

