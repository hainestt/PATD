import { bind } from './util'

/**
 *
 *
 * @export
 * @param {* Object HTMLElement} node
 * @param {* String} event
 * @param {* Function} fn
 */
export function on (node, event, fn) {
	if (node.addEventListener) {
		node.addEventListener(event, fn, false)
	} else if (node.attachEvent) { // IE8默认情况下，事件处理程序会在全局作用域中运行，因此this等于window
		node.attachEvent(`on${event}`, bind(fn, node)) // 将事件处理函数绑定到触发该事件的dom对象上
	} else {
		node[`on${event}`] = fn
	}
}

/**
 *
 *
 * @export
 * @param {* Object HTMLElement} node
 * @param {* String} event
 * @param {* Function} fn
 */
export function off (node, event, fn) {
	if (node.removeEventListener) {
		node.removeEventListener(event, fn, false)
	} else if (node.detachEvent) {
		node.detachEvent(`on${event}`, bind(fn, node))
	} else {
		node[`on${event}`] = null
	}
}

export function once1 (node, event, fn) {
    node.addEventListener(event, function t (e) {
        e.target.removeEventListener(event, t, false)
        fn.apply(this || node, arguments || e)
    }, false)
}


/**
 *
 *
 * @export
 * @param {* Object HTMLElement} node
 * @param {* String} event
 * @param {* Function} fn
 */
export function once (node, event, fn) {
	let wrap = function () {
		off(node, event, wrap)
		fn.apply(this, arguments)
	}

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

/**
 *
 *
 * @export
 * @param {* Object HTMLElement} el
 * @param {* String} cls
 */
export function addClass (el, cls) {
	if (el.classList) {
		el.classList.add(cls)
	} else {
		const cur = ' ' + (el.getAttribute('class') || '') + ' '
		if (cur.indexOf(' ' + cls + ' ') < 0) {
			el.setAttribute('class', (cur + cls).trim())
		}
	}
}

/**
 *
 *
 * @export
 * @param {* Object HTMLElement} el
 * @param {* String} cls
 */
export function removeClass (el, cls) {
	if (el.classList) {
		el.classList.remove(cls)
	} else {
		let cur = ' ' + (el.getAttribute('class') || '') + ' '
		let tar = ' ' + cls + ' '

		while(cur.indexOf(tar) >= 0) {
			cur = cur.replace(tar, ' ')
		}

		el.setAttribute('class', cur.trim())
	}

	if (!el.className) {
		el.removeAttribute('class')
	}
}

/**
 *
 *
 * @export
 * @param {* Object} event
 * @returns {* Object}
 *
 * 获取相关元素信息
 * mouseover: 事件的主目标是获得光标的元素，而相关元素就是那个失去光标的元素
 * mouseout: 事件的主目标是失去光标的元素，而相关的元素则是获得光标的元素
 *
 */
export function getRelatedTarget (event) {
	let evt = event || window.event

	if (evt.relatedTarget) {
		return evt.relatedTarget
	} else if (evt.toElement) { // IE8 -> mouseout
		return evt.toElement
	} else if (evt.fromElement) { // IE8 -> mouseover
		return evt.fromElement
	} else {
		return null
	}
}


/**
 *
 *
 * @export
 * @returns {* Object} event
 */
export function createEvent () {
	let event = null

	if (document.createEvent) {
		event = document.createEvent('CustomEvent')
	} else {
		event = document.createEventObject()
	}
	return event
}

/**
 *
 *
 * @export
 * @param {* Object} eventObj
 * @param {* String} eventType
 * @param {* Object} [detail={}]
 */
export function initEvent (eventObj, eventType, detail = {}, options) {
	if (eventObj.initCustomEvent) {
		eventObj.initCustomEvent(eventType, true, false, detail) // 参数依次为：type, bubbles, cancelable, detail对象【任意值， 保存在event对象的detail属性中】
	} else {
		let eventTemp = options || { // 手动指定event对象必要信息
			screenX: 100,
			screenY: 0,
			clientX: 0,
			clientY: 0,
			ctrlKey: false,
			altKey: false,
			shiftKey: false
		}

		for (let i in eventTemp) {
			if (eventTemp.hasOwnProperty(i)) {
				eventObj[i] = eventTemp[i]
			}
		 }

	}
}

/**
 *
 *
 * @param {* Object HTMLElement} node
 * @param {* Object} eventObj
 * @param {* String} eventType
 */
export function fireEvent (node, eventObj, eventType) {
	if (document.dispatchEvent) {
		node.dispatchEvent(eventObj)
	} else {
		node.fireEvent(eventType, eventObj)
	}
}

/**
 *
 *
 * @export
 * @param {* Object HTMLInputElement} node
 */
export function getSelectedText (node) {

	if (document.selection) { //IE8
		return document.selection.createRange().text
	} else {
		return node.value.substring(node.selectionStart, node.selectionEnd)
		// or
		// return window.getSelection().toString()
	}
}
