function sayHello (name) {
	console.log('hello ', name)
}

// setTimeout(sayHello.bind(this, 'haines') ,3000)

// setTimeout(() => {
// 	sayHello('rock')
// }, 3000)


let a =  { generator: { type: 'npm', package: 'vue' },
  dest: 'init',
  options: 'test'
}

let {
	generator: {
		type,
		package
	},
	dest
} = a

console.log(type, package, dest)
