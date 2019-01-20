let http = require('http')

let app = http.createServer((req, res) => {
	console.log(req)
	res.end('hello')
})

app.listen(1688)
console.log('Server is listening')
