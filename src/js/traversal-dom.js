
let callback = function (el) {
    console.log(el)
}

let count = 0

let fn = function (node, cb) {
	console.time('start')

	!(function fns(node) {
		count ++
		if (node.hasChildNodes()) {
			node.childNodes.forEach( el => {
				cb(el)
				fns(el)
			})
		} else {
			return
		}
	})(node)

	console.timeEnd('start')
	console.log('dom:', count)
}

/***
 *
 * crteaNodeIterator(root, whatToShow, filter, entityReferenceExpansion) // 只支持Chrome和firefox
 * root: 从树中的哪个节点开始搜索
 * whatToShow: 数值代码，代表哪些节点要被搜索
 * filter: NodeFilter对象，用来决定需要忽略哪些节点
 * entityReferenceExpansion:布尔值，表示是否需要扩展实体引用
*/
let fn2 = function (node, cb) {
	console.time('start')

	let iterator = document.createNodeIterator(node, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,null, false)
	let nextNode = iterator.nextNode()

	while(nextNode) {
		cb(nextNode)
		nextNode = iterator.nextNode()
	}
	console.timeEnd('start')
}

/***
 * createTreeWalker() //基本同上，性能堪忧。不过兼容IE9+
 * 参考：https://stackoverflow.com/questions/7941288/when-to-use-nodeiterator
*/
let fn3 = function (node, cb) {
	console.time('start')
	let iterator = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,null, false)
	let nextNode = iterator.nextNode()

	while(nextNode) {
		cb(nextNode)
		nextNode = iterator.nextNode()
	}
	console.timeEnd('start')
}


fn(document.body, callback)

