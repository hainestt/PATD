/**
 *
 * 代理实现单例
 * @export
 * @param {Function} func
 * @returns Function
 */
export function proxy(func) {
	let ins
	let handler = {
		constructor(target, args) {
			if (!ins) {
				ins = Reflect.construct(func, args)
			}

			return ins
		}
	}

	return new Proxy(func, handler)
}
