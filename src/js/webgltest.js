
class WebGLTest {
	constructor(canvas) {
		this.canvas = canvas

		this.gl = void 0
		this.positionAttribIndex = 0

		this.start()
	}

	start() {
		this.setupWebGL()
		this.setupWhatToDraw()
		this.setupHowToDraw()
		this.draw()
	}

	setupWebGL() {
		let { canvas } = this

		// this.gl = canvas.getContext('webgl')
		this.gl = canvas.getContext('experimental-webgl')
	}

	setupWhatToDraw() {
		let { gl, positionAttribIndex } = this
		let postions = [
			0.0, 0.0,
			1.0, 0.0,
			0.0, 1.0
		] // 定义三角形
		let typedPositions = new Float32Array(postions)
		let positionBuffer = gl.createBuffer()

		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
		gl.bufferData(gl.ARRAY_BUFFER, typedPositions, gl.STATIC_DRAW) // gl.STATIC_DRAW 参数声明将设置缓存内容一次，但要多次使用

		// 选择一个槽，告诉上下文如何填充数据
		gl.enableVertexAttribArray(positionAttribIndex)
		gl.vertexAttribPointer(positionAttribIndex, 2, gl.FLOAT, false, 0, 0) //告诉显卡从当前绑定的缓冲区中读取顶点数据

	}

	setupHowToDraw() {
		let { gl, positionAttribIndex } = this
		let vsSource = `
			attribute vec2 aPosition;
			void main(void) {
				gl_Position = vec4(aPosition, 0.0, 1.0);
			}
		`

		let fsSource =  `
			void main(void) {
				gl_FragColor = vec4(1.0, 0.5, 0.6, 1.0);
			}
		`

		let vertexShader = gl.createShader(gl.VERTEX_SHADER)
		gl.shaderSource(vertexShader, vsSource)
		gl.compileShader(vertexShader)

		let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
		gl.shaderSource(fragmentShader, fsSource)
		gl.compileShader(fragmentShader)

		let program = gl.createProgram()
		gl.attachShader(program, vertexShader)
		gl.attachShader(program, fragmentShader)

		gl.bindAttribLocation(program, positionAttribIndex, 'aPosition')
		gl.linkProgram(program)
		gl.useProgram(program)
	}

	draw() {
		let { gl } = this
		gl.clearColor(0.1, 0.5, 0.8, 1.0)
		gl.clear(gl.COLOR_BUFFER_BIT)
		gl.drawArrays(gl.TRIANGLES, 0, 3)
	}
}

// cube
class Cube {
	constructor() {
		this.name = 'cube'

		this.verticles = new Float32Array([
			-1.0, -1.0, 1.0,
			1.0, -1.0, 1.0,
			-1.0, 1.0, 1.0,
			1.0, 1.0, 1.0,
			-1.0, -1.0, -1.0,
			1.0, -1.0, -1.0,
			-1.0, 1.0, -1.0,
			1.0, 1.0, -1.0
		])

		this.triangleIndices = new Uint16Array([
			0, 1, 2, 2, 1, 3, // front
			5, 4, 7, 7, 4, 6, // back
			4, 0, 6, 6, 0, 2, // left
			1, 5, 3, 3, 5, 7, // right
			2, 3, 6, 6, 3, 7, // top
			4, 5, 0, 0, 5, 1 // bottom
		])

		this.numVertices = this.verticles.length / 3
		this.numTriangles = this.triangleIndices / 3
	}
}

// cone
class Cone {
	constructor(resolution) {

		this.name = 'cone'
		this.verticles - new Float32Array(3 * (resolution + 2))

		// 圆锥的顶点，约定顺序存储：索引|0 ->顶点；索引|1···n -> 底面顶点; 索引|n+1 -> 底面中点
		this.verticles[0] = 0.0
		this.verticles[1] = 2.0
		this.verticles[2] = 0.0

		// 基
		let radius = 1.0
		let angle
		let step = 6.283185307 / resolution

		let vertexoffset = 3
		for (let i = 0; i < resolution; i++) {
			angle = step * i

			this.verticles[vertexoffset] = radius * Math.cos(angle) // x
			this.verticles[vertexoffset + 1] = 0.0 // y
			this.verticles[vertexoffset + 2] = radius * Math.sin(angle) // z

			vertexoffset += 3
		}

		this.verticles[vertexoffset] = 0.0
		this.verticles[vertexoffset + 1] = 0.0
		this.verticles[vertexoffset + 2] = 0.0

		// 三角形定义
		this.triangleIndices = new Uint16Array(3 * 2 * resolution)

		// 侧面
		let triangleoffset = 0
		for (let i = 0; i < resolution; i++) {
			this.triangleIndices[triangleoffset] = 0
			this.triangleIndices[triangleoffset + 1] = 1 + (i % resolution)
			this.triangleIndices[triangleoffset + 2] = 1 + ((i + 1) % resolution)

			triangleoffset += 3
		}

		// 底面
		for (let i = 0; i < resolution; i++) {
			this.triangleIndices[triangleoffset] = resolution + 1
			this.triangleIndices[triangleoffset + 1] = 1 + (i % resolution)
			this.triangleIndices[triangleoffset + 2] = 1 + ((i + 1) % resolution)

			triangleoffset += 3
		}

		this.numVertices = this.verticles.length / 3
		this.numTriangles = this.triangleIndices.length / 3

	}

}

// Cylinder
class Cylinder{
	constructor(resolution){
		this.name = 'cylinder'
		this.verticles = new Float32Array(3 * (2 * resolution + 2))

		let radius = 1.0 // 半径为1
		let angle
		// 将底部圆细分为resolution个均匀扇形
		let step = 6.283185307 / resolution

		// 底部圆顶点
		let vertexoffset = 0
		// 依次计算每个扇形的顶点坐标
		for(let i = 0; i < resolution; i++) {
			angle = step * i

			this.verticles[vertexoffset] = radius * Math.cos(angle) // x
			this.verticles[vertexoffset + 1] = 0.0 // y
			this.verticles[vertexoffset + 2] = radius * Math.sin(angle) // z

			vertexoffset += 3
		}

		// 顶部圆顶点
		for (let i = 0; i < resolution; i++) {
			angle = step * i

			this.verticles[vertexoffset] = radius * Math.cos(angle)
			this.verticles[vertexoffset + 1] = 0.0
			this.verticles[vertexoffset + 2] = radius * Math.sin(angle)

			vertexoffset += 3
		}

		this.verticles[vertexoffset] = 0.0
		this.verticles[vertexoffset + 1] = 2.0 // 高度为2
		this.verticles[vertexoffset + 2] = 0.0

		// 三角形定义
		this.triagleIndices = new Uint16Array(3 * 4 * resolution)

		// 侧表面
		let triangleoffset = 0
		for (let i = 0; i < resolution; i++) {
			this.triagleIndices[triangleoffset] = i
			this.triagleIndices[triangleoffset + 1] = (i + 1) % resolution
			this.triagleIndices[triangleoffset + 2] = (i % resolution) + resolution

			triangleoffset += 3

			this.triagleIndices[triangleoffset] = (i % resolution) + resolution
			this.triagleIndices[triangleoffset + 1] = (i + 1) % resolution
			this.triagleIndices[triangleoffset + 2] = ((i + 1) % resolution) + resolution

			triangleoffset += 3
		}

		// 底面三角形索引
		for (let i = 0; i < resolution; i++) {
			this.triagleIndices[triangleoffset] = i
			this.triagleIndices[triangleoffset + 1] = (i + 1) % resolution
			this.triagleIndices[triangleoffset + 2] = 2 * resolution

			triangleoffset += 3
		}

		// 顶部三角形索引
		for (let i = 0; i < resolution; i++) {
			this.triagleIndices[triangleoffset] = resolution + i
			this.triagleIndices[triangleoffset + 1] = ((i + 1) % resolution) + resolution
			this.triagleIndices[triangleoffset + 2] = 2 * resolution + 1

			triangleoffset += 3
		}

		this.numVertices = this.verticles.length / 3
		this.numTriangles = this.triagleIndices.length / 3

	}
}

class Triangle {
	constructor() {
		// 名称
		this.name = 'Triangle'
		// 顶点数组
		this.verticles = new Float32Array([0,0,0,0.5,0,-1,-0.5,0,-1])
		// 三角形索引
		this.triagleIndices = new Uint16Array([0, 1, 2])
		// 顶点数目
		this.numVertices = 3
		//三角形数目
		this.numTriangles = 1
	}
}

class NVMCClient {
	constructor(canvas) {
		this.canvas = canvas

		this.objBuffer = null
		this.shaderProgram = null
	}

	createObjectBuffer(gl, obj) {
		obj.vertexBuffer = gl.createBuffer()
		gl.bindBuffer(gl.ARRAY_BUFFER, obj.vertexBuffer)
		gl.bufferData(gl.ARRAY_BUFFER, obj.verticles, gl.STATIC_DRAW)
		gl.bindBuffer(gl.ARRAY_BUFFER, null)

		obj.indexBufferTriangles = gl.createBuffer()
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indexBufferTriangles)
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, obj.triagleIndices, gl.STATIC_DRAW)
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)

		// 创建边
		let edges = new Uint16Array(obj.numTriangles * 3 * 2)
		for(let i = 0; i < obj.numTriangles; i++) {
			edges[i * 6 + 0] = obj.triagleIndices[i * 3 + 0]
			edges[i * 6 + 1] = obj.triagleIndices[i * 3 + 1]
			edges[i * 6 + 2] = obj.triagleIndices[i * 3 + 0]
			edges[i * 6 + 3] = obj.triagleIndices[i * 3 + 2]
			edges[i * 6 + 4] = obj.triagleIndices[i * 3 + 1]
			edges[i * 6 + 5] = obj.triagleIndices[i * 3 + 2]
		}

		obj.indexBufferEdges = gl.createBuffer()
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indexBufferEdges)
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, edges, gl.STATIC_DRAW)
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)

		return obj
	}

	initializeObjects (gl) {
		this.trigangle = new Triangle()
		this.createObjectBuffer(gl, this.trigangle)
	}

	drawObject(gl, obj, fillColor, lineColor) {
		gl.bindBuffer(gl.ARRAY_BUFFER, gl.vertexBuffer)
		gl.enableVertexAttribArray(this.uniformShader.aPositionIndex)
		gl.vertexAttribPointer(this.uniformShader, aPositionIndex, 3, gl.FLOAT, false, 0, 0)

		gl.enable(gl.POLYGON_OFFSET_FILL)
		gl.polygonOffset(1.0, 1.0)

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indexBufferTriangles)
		gl.uniform4fv(this.uniformShader.uColorLocation, fillColor)
		gl.drawELements(gl.TRIANGLES, obj.triagleIndices.length, gl.UNSIGEND_SHORT, 0)

		gl.disable(gl.POLYGON_OFFSET_FILL)

		gl.uniform4fv(this.uniformShader.uColorLocation, lineColor)
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indexBufferEdges)
		gl.drawELements(gl.LINES, obj.numTriangles * 3 * 2, gl.UNSIGEND_SHORT, 0)
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)

		gl.disableVertexAttribArray(this.uniformShader.aPositionIndex)
		gl.bindBuffer(gl.ARRAY_BUFFER, null)
	}

	uniformShader(gl) {

		let vertexShaderSource = `
			uniform mat4 uModelViewMatrix;
			attribute vec3 aPosition;

			void main(void) {
				gl_Position =  uModelViewMatrix * vec4(aPosition, 1.0);
			}
		`
		let fragmentShaderSource = `
			precision highp float;
			uniform vec3 uColor;

			void main(void) {
				gl_FragColor = vec4(uColor, 1.0);
			}
		`

		// 创建顶点着色器
		let vertexShader = gl.createShader(gl.VERTEX_SHADER)
		gl.shaderSource(vertexShader, vertexShaderSource)
		gl.compileShader(vertexShader)

		// 创建片段着色器
		let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
		gl.shaderSource(fragmentShader, fragmentShaderSource)
		gl.compileShader(fragmentShader)

		// 创建着色器程序
		let aPositionIndex = 0
		let shaderProgram = gl.createProgram()
		gl.attachShader(shaderProgram, vertexShader)
		gl.attachShader(shaderProgram, fragmentShader)
		gl.bindAttribLocation(shaderProgram, aPositionIndex, 'aPosition')
		gl.linkProgram(shaderProgram)

		if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
			let str = `Unable to initialize the thader program.\n
				VS: ${gl.getShaderInfoLog(vertexShader)}\n
				FS: ${gl.getShaderInfoLog(fragmentShader)}\n
				PROG: ${gl.getProgramInfoLog(shaderProgram)}`

			console.error(str)
		}

		shaderProgram.aPositionIndex = aPositionIndex
		shaderProgram.uModelViewMatrixLocation = gl.getUniformLocation(shaderProgram, 'uModelViewMatrix')
		shaderProgram.uProjectionMatrixLocation = gl.getUniformLocation(shaderProgram, 'uProjectionMatrix')
		shaderProgram.uColorLocation = gl.getUniformLocation(shaderProgram, 'uColor')

		return shaderProgram

	}

	onInitizlize(obj) {
		console.log(`SpiderGL Version ${SGL_VERSION_STRING}`)

		let { canvas } = this

		let game = this.game
		let handleKey = Object.create({})

		this.gl = canvas.getContext('experimental-webgl')


		handleKey['W'] = on => {
			game.playerAccelerate = on
		}

		handleKey['S'] = on => {
			game.playerBrake = on
		}

		handleKey['A'] = on => {
			game.playerSteerLeft = on
		}

		handleKey['D'] = on => {
			game.playerSteerRight = on
		}

		this.handleKey = handleKey

		this.stack = new SglMatrixStack()

		console.log('sglstack->', this.stack)
		this.objBuffer = this.createObjectBuffer(this.gl, obj)
		this.shaderProgram = this.uniformShader(this.gl)
	}

	drawThePrimitive(obj) {
		let { canvas,  shaderProgram, gl, objBuffer} = this
		let width = canvas.clientWidth
		let height = canvas.clientHeight
		let incAngle = 0.3
		let currentAngle = 0

		let { vertexBuffer, indexBufferTriangles, indexBufferEdges } = objBuffer
		let { uModelViewMatrixLocation, aPositionIndex, uColorLocation, uProjectionMatrixLocation } = shaderProgram

		gl.viewport(0,0, width, height)
		gl.clearColor(0.3, 0.5, 0.7, 1.0)
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

		// 设置投射矩阵
		let projMat = SglMat4.perspective(0.8, width/height, 0.1, 1000.0)

		// 设置模型/视图矩阵
		let viewMat

		if (obj.name = 'cube') {
			viewMat = SglMat4.lookAt([0, 2, 6], [0, 0, 0], [0, 1, 0])
		}

		let modelMat = SglMat4.rotationAngleAxis(sglDegToRad(-currentAngle), [0, 1, 0])

		let modelviewprojMat = SglMat4.mul(projMat, SglMat4.mul(viewMat, modelMat))

		gl.enable(gl.DEPTH_TEST)
		gl.useProgram(shaderProgram)

		gl.uniformMatrix4fv(uModelViewMatrixLocation, false, modelviewprojMat)

		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
		gl.enableVertexAttribArray(aPositionIndex)
		gl.vertexAttribPointer(aPositionIndex, 3, gl.FLOAT, false, 0, 0)

		gl.enable(gl.POLYGON_OFFSET_FILL)

		gl.polygonOffset(1.0, 1.0)

		gl.uniform3f(uColorLocation, 0.82, 0.82, 0.82)
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferTriangles)

		gl.drawElements(gl.TRIANGLES, obj.triangleIndices.length, gl.UNSIGEND_SHORT, 0)

		gl.disable(gl.POLYGON_OFFSET_FILL)

		gl.uniform3f(uColorLocation, 0.0, 0.0, 0.0	)
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferEdges)
		gl.drawElements(gl.LINES, obj.numTriangles*3*2, gl.UNSIGEND_SHORT, 0)

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)

		gl.disableVertexAttribArray(aPositionIndex)
		gl.bindBuffer(gl.ARRAY_BUFFER, null)

		gl.useProgram(null)

		gl.disable(gl.DEPTH_TEST)

		currentAngle += incAngle

		if(currentAngle > 360) {
			currentAngle -= 360
		}


	}
}

let cubeObj = new Cube()
let canvas = document.querySelector('#webgltest')
let ins = new NVMCClient(canvas)
ins.onInitizlize(cubeObj)
ins.drawThePrimitive(cubeObj)


// new WebGLTest()
