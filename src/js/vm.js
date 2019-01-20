

/***
 * ViewModel
*/
function ViewModel(options) {
	let vm = this

	let data = options.data

	new Observer(vm, data)

	new Compiler(vm, options)
}




/***
 * Compiler
*/

function Compiler(vm, options) {

	let compiler = this

	let el = options.el

	let templete = document.querySelector(el)

	let fdom = compiler.toFragment(vm, templete)

	templete.appendChild(fdom)
}

Compiler.prototype.toFragment = function (vm, node) {
	let compiler = this
	let frag = document.createDocumentFragment()
	let childNode


	while (childNode = node.firstChild) {
		compiler.compiler(vm, childNode)
		frag.appendChild(childNode)
	}

	return frag

}


Compiler.prototype.compiler = function(vm, node) {

	let reg = /\{\{(.*)\}\}/

	if (node.nodeType === 1) {
		let attrs = [].slice.call(node.attributes)

		attrs.forEach(attr => {
			if (attr.nodeName === 'v-model') {
				let aVal = attr.nodeValue

				if (node.nodeName.toLowerCase() === 'input') {

					node.addEventListener('input', e => {
						vm[aVal] = e.target.value
						console.log('compiler-vm', vm)
					})
					node.value = vm[aVal]
					node.removeAttribute('v-model')
				}
			}
		})
	}

	if (node.nodeType === 3) {
		node.nodeValue.replace(reg, (m0, m1) => {
			let value = m1.trim()

			// node.nodeValue = vm[value]
			new Watcher(vm, node, value)
		})
	}

}

/***
 * Observer
*/

function Observer (vm, data) {
	let obs = this

	if (!data || typeof data !== 'object')  return

	Object.keys(data).forEach(key => {
		obs.observer(vm, key, data[key])
	})
}

Observer.prototype.observer = function (vm, key, value) {

	// new Observer(value) // observer nest properties

	let dep = new Dep()

	Object.defineProperty(vm, key, {
		get () {
			if (Dep.target) {
				dep.addSub(Dep.target)
			}
			return value
		},
		set (newValue) {
			if (newValue == value) return

			value = newValue
			dep.notify()
		}
	})
}

/***
 * Dep
*/

function Dep () {
	this.subs = []
}

Dep.prototype.addSub = function (sub) {
	this.subs.push(sub)
}

Dep.prototype.notify = function () {
	this.subs.forEach(sub => {
		sub.update()
	})
}


/***
 * Wather
*/

function Watcher (vm, node, val) {
	Dep.target = this

	this.val = val
	this.node = node
	this.vm = vm

	this.update()

	Dep.target = null
}

Watcher.prototype.update = function () {
	this.get ()

	/***
	 * this.value --> input value
	 */
	this.node.nodeValue = this.value
}

Watcher.prototype.get = function () {

	/**
	 * this.value --> input value
	 */
	this.value = this.vm[this.val]
}



// export { ViewModel as Vue }
window.Vue = ViewModel

// demo
(function () {
	new Vue({
		el: '#vm-test',
		data: {
			text: '👋, hello world'
		}
	})
} ())
