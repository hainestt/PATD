'use strict';

var prefilters = {}

function curry (structure) {

    return function (func) {
        structure['*'] = func
    }
}

var ajaxPrefilter = curry(prefilters)

ajaxPrefilter(function (options) {
    return {
        send: function (){

        },
        callback: function () {

        }
    }
})

console.log('prefilters', prefilters)