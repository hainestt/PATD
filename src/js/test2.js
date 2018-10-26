var leaks = (function () {
	let leak = 'leak test'

	return function () {
		console.log(leak)
	}
})()
leaks()

import _ from 'lodash'

_.add(1,2)
