import * as bind from './bind'
import * as dom from './dom'
import * as arr from './array'

Object.defineProperty(__webpack_exports__ , '__esModule', {
	value: true
})


exportKeys(bind)
exportKeys(dom)
exportKeys(arr)


function exportKeys(obj) {
	if (obj !== null) {
		Object.keys(obj).forEach(key => {
			Object.defineProperty(__webpack_exports__, key, {
				value: obj[key],
				enumerable: true,
				writable: false
			})
		})
	}

}
