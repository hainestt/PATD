/**
 * 1, 异步与回调
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
				} else {
					return Promise.resolve(next.value)
						.then(handleNext, function handleError(err) {
							return Promise.resolve(
								it.throw(err)
							)
							.then(hadnleResult)
						})
				}
			})(next)
		})

}
