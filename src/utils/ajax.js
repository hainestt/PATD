export function request(url, method = 'GET') {

	let xhr = new XMLHttpRequest()

	return new Promise((resolve, reject) => {
		xhr.open(method, url, true)
		// xhr.setRequestHeader('Content-Type', 'text/html')
		xhr.send()

		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
					resolve(xhr.responseText)
				} else {
					reject(xhr.status)
				}
			}
		}
	})

}
