import 'whatwg-fetch'

fetch('http://localhost:1688/api/v1/jsonp?callback=cbs', {
	method: 'GET',
	// headers: new Headers({
	// 	'Access-Control-Allow-Origin': '*',
	// 	'Content-Type': 'application/json'
	// }),
	// mode: 'no-cors',
	// credentials: 'include',
	// redirect: 'follow',
	// integrity,
	// cache: 'no-cache'
})
.then(res => {
	return res.text()
})
.then(data => {
	console.log('data', data)
})
