import 'whatwg-fetch'

fetch('/url', {
	method: 'GET',
	headers: new Headers({
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json'
	}),
	mode: 'no-cors',
	credentials: 'include',
	// redirect: 'follow',
	// integrity,
	// cache: 'no-cache'
})
.then(res => {
	console.log('res', res)
})
