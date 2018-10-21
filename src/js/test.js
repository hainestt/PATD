
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

import { on } from '../utils'

on(document.body, 'click' ,function(e) {
	console.log('e', e)
})

