const phantom = require('phantom'),
	path = require('path');

(async function() {
	const instance = await phantom.create(),
		page = await instance.createPage()

	await page.property('viewportSize', {width:1920, height: 1080})
	const status = await page.open('https://www.apowersoft.com/apower-mac-audio-recorder')

	console.log(`Page opened with status [${status}].`)

	await page.render(path.resolve(__dirname, '../img/screen/test.jpg') )

	await instance.exit()
	
})();