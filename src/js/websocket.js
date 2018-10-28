/**
 *
 *
 * @class Socket
 *
 * cfg {
 * 	url: '',
 *  timeout: 0,
 * 	ws: null,
 * 	onmessage: null
 *
 * }
 */

const privateInit = Symbol('init')
const privateProp = Symbol('des')

class Socket {
	constructor (cfg) {
		this[privateInit](cfg)
		// private property
		this[privateProp] = 'web socket'
	}
	// private fn
	[privateInit] (cfg) {
		for (let i in cfg) {
			this[i] = cfg[i]
		}
	}
	// public fn
	open () {
		this.ws = new WebSocket(this.url)
		this.ws.open = this.onWSOpen.bind(this)
		this.ws.onclose = this.onWSClose.bind(this)
		this.ws.onmessage = this.onWSMessage.bind(this)
		this.ws.onerror = this.onWSError.bind(this)
	}

	send (json) {
		if (typeof json === 'object') {
			json = JSON.stringify(json)
		}
		this.ws.send(json)
	}

	close () {
		this.ws.close()
	}

	onWSOpen () {}

	onWSClose () {}

	onWSMessage (e) {
		try {
			this.onmessage(e.data)
		} catch (e) {
			console.error(`Can't parse message ${e.data}`)
		}
	}

	onWSError () {}

}

var socket = new Socket({
    url: 'ws://127.0.0.1:11688',
    onmessage (msg) {
        console.log('recive server message->', msg)
    }
})

socket.open()
var i = 100001

setInterval(function () {
    socket.send(i++)
}, 5000)
