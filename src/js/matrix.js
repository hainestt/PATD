'use strict';

class Matrix {
	constructor(canvas) {
		this.canvas = canvas

		this.speed = 60
		this.ctx = null
		this.w = 0
		this.h = 0
		this.ratio = 1
		this.column = 0
		this.fontsize = 14
		this.fillarr = []

		this.characters = {
			'a': 'qwertyuiopasdfghjklzxcvbnm',
			'A': 'QWERTYUIOPASDFGHJKLZXCVBNM',
			'c': 'абвгдежзиклмнопрстуфхцчшщъыьэюя',
			'C': 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ',
			// 'e': '☺☻✌♡♥❤⚘❀❃❁✼☀✌♫♪☃❄❅❆☕☂★',
			'g': 'αβγδεζηθικλμνξοπρστυφχψως',
			'G': 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ',
			'k': 'ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ',
			'm': 'ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ'+
				 '1234567890-=*_+|:<>"-=*_+|:<>"-=*_+|:<>"-=*_+|:<>"',
			'n': '1234567890',
			'o': 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890'+
				 '`-=~!@#$%^&*()_+[]{}|\;\':",./<>?"',
			'p': '',
			'P': '',
			'r': 'mcclllxxxxvvvvviiiiii',
			'R': 'MCCLLLXXXXVVVVVIIIIII',
			's': '-=*_+|:<>"',
			'S': '`-=~!@#$%^&*()_+[]{}|\;\':",./<>?"'
		}
	}

	start () {
		this.init()
		this.run()
	}
	init () {
		if (this.canvas) {
			this.ctx = this.canvas.getContext('2d')
			this.ratio = window.devicePixelRatio || 1

			this.w = window.innerWidth
			this.h = window.innerHeight

			this.canvas.width = this.w * this.ratio
			this.canvas.height = this.h * this.ratio

			this.ctx.scale(this.ratio, this.ratio)

			this.column  = Math.floor(this.w / this.fontsize)

			this.fillarr = Array(this.column).fill(0)
		}
	}
	run () {
		setInterval(this.draw.bind(this), this.speed)
	}

	draw () {
		let { ctx, w, h, column, fontsize, fillarr, characters } = this

		ctx.fillStyle = "rgba(0,0,0, 0.2)"
		ctx.fillRect(0,0,w,h)
		ctx.font = `${fontsize}px serif`
		ctx.fillStyle = 'green'
		for (let i = 0; i < column; i++) {
			fillarr[i]++

			let x = i * fontsize
			let y = fillarr[i] * fontsize
			let keys = Object.keys(characters)
			let randomkey = keys[Math.floor(Math.random() * keys.length)]
			let str = Object.values(characters[randomkey])
			ctx.fillText(str[Math.floor(Math.random() * str.length)], x, y)

			if (y > h && Math.random() >= 0.9) {
				fillarr[i] = 0
			}

		}
	}

}


// test
new Matrix(document.querySelector('canvas')).start()
