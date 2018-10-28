import {
	on,
	createEvent,
	initEvent,
	fireEvent,
	getSelectedText
} from '../utils'

!(function () {
	/***
	 * DOM Modified
	*/
	let ul = document.querySelector('.dom-remove > ul')

	on(document, 'DOMSubtreeModified', event => {
		event.stopPropagation()
		// console.log(event.type, event.target)
	})

	on(document, 'DOMNodeRemoved', event => {
		event.stopPropagation()
		// console.log(event.type, event.target, event.relatedNode)
	})

	on(ul.firstChild, 'DOMNodeRemovedFromDocument', event => {
		// console.log(event.type, event.target)
	})

	ul.parentNode.removeChild(ul)
})()

!(function () {
	/***
	 * pageshow,pagehide
	 */

	on(window, 'pageshow', event => {
		console.log(event.type, event.target, event.persisted)
	})

})()

!(function () {
	/**
	 * touch && guesture
	 * 触发顺序：touchstart->touchend->mouseover(只会触发一次)->mousemove->mousedown->mouseup->click
	*/
	let str = ''
	on(document, 'touchstart', event => {
		console.log(event.type, event.target)
		str += `-${event.type}`
	})

	on(document, 'mouseover', event => {
		// console.log(event.type, event.target)
		str += `-${event.type}`
	})

	on(document, 'mousemove', event => {
		// console.log(event.type, event.target)
		str += `-${event.type}`
	})

	on(document, 'mousedown', event => {
		// console.log(event.type, event.target)
		str += `-${event.type}`
	})

	on(document, 'mouseup', event => {
		// console.log(event.type, event.target)
		str += `-${event.type}`
	})

	on(document, 'click', event => {
		// console.log(event.type, event.target)
		str += `-${event.type}`
	})

	on(document, 'touchend', event => {
		// console.log(event.type, event.target)
		str += `-${event.type}`
	})

	// IOS 引入的gesture事件
	on(document, 'gesturestart', event => {
		// console.log(event.type, event.target)
		str += `-${event.type}`
	})

	on(document, 'gesturechange', event => {
		// console.log(event.type, event.target)
		str += `-${event.type}`
	})

	on(document, 'gestureend', event => {
		// console.log(event.type, event.target)
		str += `-${event.type}`
	})

	let timer = setTimeout(function fn (){
		document.querySelector('.event > div').textContent = str

		if (str.length < 300) {
			setTimeout(fn, 1000)
		} else {
			clearTimeout(timer)
			timer = null
		}
	}, 1000)


})()

!(function () {
	/***
	 * custom event
	*/

	// 事件监听必须放在前面，否则无法监听到自定义事件
	on(document, 'myEvent', event => {
		console.log('custom-event', event)
	})

	let event = createEvent()

	initEvent(event, 'myEvent', 'Hello Haines')

	fireEvent(document, event, 'myEvent')
})()

!(function () {
	/***
	 * 复制文本
	*/

	let form = document.querySelector('.from form')
	// let input = form[0].elements['name']
	let input = form['name']

	on(input, 'select', event => {
		let target = event.target || event.srcElement

		let text = getSelectedText(target)

		console.log('text->', text)

		document.execCommand('copy') //Safari 只支持click选中
	})

})()
