
'use strict';

var requestFrame = (function(){
    var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
        function(fn){ return window.setTimeout(fn, 20); };
    return function(fn){ return raf(fn); };
})();

var cancelFrame = (function(){
    var cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame ||
        window.clearTimeout;
    return function(id){ return cancel(id); };
})();

var type = function (obj) {
    var arr = 'Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' '),
        class2type = {}

    arr.forEach(function(item) {
        class2type["[object" + name + "]"] = item.toLowerCase()
    })

    if (obj == null) {
        return obj + '';
    }

    return typeof obj === 'object' ||
            typeof obj === 'function' ? 
            class2type[ toString.call( obj )] || 'object' :
            typeof obj
}
