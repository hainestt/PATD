let fs = require('fs')
let path = require('path')

let files = fs.readdirSync(__dirname)

files.map(item => {
	let currentPath = `${__dirname}/${item}`
	let isDirector = fs.statSync(currentPath).isDirectory()

	// console.log(isDirector)
})


let rootPath = path.join(__dirname, '../../src')

console.log(rootPath)
