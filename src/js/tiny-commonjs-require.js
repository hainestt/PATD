'use strict';

function require(path) {

	var resolved = require.resolve(path)

	/**
	 * moduel -> register中definition方法，固定有三个参数：exports,require,module
	*/
	var module = require.modules[resolved]

	if (!module._resolving && !module.exports) {
		var mod = {}
		mod.exports = {}
		module._resolving = true
		module.call(mod.exports, mod.exports, require.relative(resolved), mod)
		delete module._resolving
		module.exports = mod.exports
	}

	return module.exports
}

require.modules = {}

require.resolve = function (path) {
	if (path.charAt(0) === '/') path = path.slice(1)

	var paths = [
		path,
		path + '.js',
		path + '.json',
		path + '/index.js',
		path + '/index.json'
	]

	for (var i = 0, len = paths.length; i < len; i++) {
		var path = paths[i]
		if (require.modules.hasOwnProperty(path)) return path
	}
}

var define = require.register = function (path, definition) {
	require.modules[path] = definition
}

/**
 * ['foo'].join('/') --> foo
 * ['foo','bar'].join('/') --> foo/bar
*/

require.relative = function (path) {
	return function(p) {
		if ('.' !== p.charAt(0)) return require(p)

		path = path.split('/')
		var segs = p.split('/')
		path.pop()

		for (var i = 0, len = segs.length; i < len; i++) {
			var seg = segs[i]
			if ('..' == seg) {
				path.pop()
			} else if ('.' != seg) {
				path.push(seg)
			}
		}

		return require(path.join('/'))
	}
}
