// 'use strict'

// let octalNumber = 0o77

// console.log('octalNum', octalNumber)

import { generateArr } from '../utils'

// var a = generateArr(4294967295)

// console.log(a)

function Person () {}


Person.prototype = {
	name: 'Haines',
	age: 27,
	job: 'Web Front-End Engineer',
	sayName: function () {
		console.log(this.name)
	}
}

let firend = new Person()


firend.sayName()
