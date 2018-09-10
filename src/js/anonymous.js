'use strict';

// (function(global){
//     console.log('global', global);
// })(typeof global !== 'undefined' ? global : window)


(function (factory) {
    var root = (typeof self === 'object' && self.self === self && self) || 
                (typeof global === 'object' && global.global === global && global)

    root.Backbone = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$))

})(function (root, Backbone, _, $) {

    var previousBackbone = root.Backbone;

    Backbone.$ = $

    Backbone.noConflict = function () {
        root.Backbone = previousBackbone

        return this
    }

    /**
     * ...
     */
    return Backbone 
});