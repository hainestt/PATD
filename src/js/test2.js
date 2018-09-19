var leaks = (function () {
	let leak = 'leak test'

	return function () {
		console.log(leak)
	}
})()
leaks()
