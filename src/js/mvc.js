
!(function () {
	'use strict'

	let lx = {}

	lx.Model = function () {

	}

	lx.Model.prototype = {
		constructor: lx.Model,
		extend (obj) {
			for (let key in obj) {
				if (obj.hasOwnProperty(key)) {
					this[key] = obj[key]
				}
			}
		},

		setModel () {
			let properties = Object.getOwnPropertyNames(this)

			properties.forEach(item => {
				// this[item]

			})
		},
		getModel () {

		}
	}

	lx.View = function () {

	}

	lx.Control = function () {

	}

	let as = {
		a: '1',
		b: '2'
	}

	let instance = new lx.Model()
	let ins = instance.extend(as)

	console.log(instance.setModel())

})()
