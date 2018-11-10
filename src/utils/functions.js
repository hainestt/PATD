import * as _ from 'lodash'

export function cat () {
	let firstArg = [].slice.call(arguments, 0, 1)
	let restArgs = [].slice.call(arguments, 1)

	if (!!firstArg.length) {
		return firstArg.concat.apply(firstArg, restArgs)
	} else {
		return []
	}
}

export function construct(head, tail) {

	return cat([head], _.toArray(tail))
}

