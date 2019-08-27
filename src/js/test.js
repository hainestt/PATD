
import {proxy} from './proxy-reflect'

let count = 0
function foo () {
	count++
	console.log('foo->count', count)
}

let ins = proxy(foo)
ins()
