/**
 * 支持thunk的generator执行器
*/

export function run (gen) {
	let args = ([]).slice.call(arguments, 1)
	let it

	it = gen.apply(this, args)

	return Promise.resolve()
		.then(function handleNext(value) {

			let next = it.next(value)

			return (function hadnleResult(next){
				if (next.done) {
					return next.value
				} else if (typeof next.value == 'function') {
					return new Promise((resolve, reject) => {
						next.value((err, msg) => {
							if (err) {
								reject(err)
							} else {
								resolve(msg)
							}
						})
					})
					.then(handleNext, err =>{
						return Promise.resolve(
							it.throw(err)
						)
						.then(hadnleResult)
					})
				}
				else {
					return Promise.resolve(next.value)
						.then(handleNext, err => {
							return Promise.resolve(
								it.throw(err)
							)
							.then(hadnleResult)
						})
				}
			})(next)
		})

}
