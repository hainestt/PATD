
// let wroxwin= window.open('//blog.hainest.com', 'wroxWindow', 'height=400, width=400,top=10,left=10,resizable=yes')
// wroxwin.resizeTo(500, 500)
// wroxwin.moveTo(100, 100)

// import Vue from 'vue'

// let app = new Vue({
// 	data: {
// 		name: 'Haines'
// 	}
// })
// console.log('vue', app.name)

var foo = {n: 1}

!(function bar (foo) {
	foo.n = 2
	// foo = {n:2}
	console.log('foo-in', foo)
})(foo)

console.log('foo-out', foo)
