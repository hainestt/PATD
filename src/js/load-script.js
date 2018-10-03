

const loadScript = (url, callback) => {
	let script = document.createElement('script')

	script.type="text/javascript"
	script.defer = true

	if (script.readyState) {  // for IE10以下
		script.onreadystatechange = () => {
			if (script.readyState === 'loaded' || script.readyState === 'complete') {
				script.onreadystatechange = null // GC
				callback()
			}
		}
	} else {
		script.onload = callback
	}

	script.src = url
	document.head.appendChild(script)
}

loadScript('./js/apply-use.js', () => {
	console.log('done')
})
