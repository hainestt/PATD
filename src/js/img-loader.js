let imgLoader = function () {
	let imgNode = document.createElement('img')
	document.body.appendChild(imgNode)

	return {
		setSrc (src) {
			imgNode.src = src
		}
	}
}

let proxyImage = (() => {
	let img = new Image()
	img.onload = () => {
		imgLoader.setSrc(img.src)
	}

	return {
		setSrc (src) {
			imgLoader.setSrc('../img/icons/refresh.svg')
			img.src = src
		}
	}
})()
proxyImage.setSrc('https://dhwwtar19mmjy.aoscdn.com/apowercom/wp-content/uploads/2019/04/apowercompress-20190402.jpg')
