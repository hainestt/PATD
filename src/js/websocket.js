'use strict'

var Socket = function(cfg) {
    this.init(cfg)
}

Socket.prototype = {
    url: '',
    timeout: 0,
    ws: null,
    onmessage: null,
    init: function (cfg) {
        for (var i in cfg) {
            this[i] = cfg[i]
        }
    },
    open: function () {
        this.ws = new WebSocket(this.url)
        this.ws.onopen = this.onWSOpen.bind(this)
        this.ws.onclose = this.onWSClose.bind(this)
        this.ws.onmessage = this.onWSMessage.bind(this)
        this.ws.onerror = this.onWSError.bind(this)
    },
    send: function (json) {
        if (typeof json === 'object') {
            json = JSON.stringify(json)
        }
        this.ws.send(json)
    },
    close: function () {
        this.ws.close()
    },
    onWSOpen: function (){},
    onWSMessage: function (e) {
        try{
            this.onmessage(e.data)
        } catch(e) {
            console.error('Can\'t parse message: ' + e.data)
        }
    },
    onWSClose: function () {},
    onWSError: function (){}
}


var socket = new Socket({
    url: 'ws://127.0.0.1:18089',
    onmessage: function (msg) {
        console.log('recive server message->', msg)
    }
})

socket.open()
var i = 100001
setInterval(function () {
    socket.send(i++)
}, 5000)