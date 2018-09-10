'use strict';

(function (){
    let btn = document.querySelector('#event-once-btn')
    
    /***
     * first solution
     */
    btn.addEventListener('click', function cb(e) {
        alert('only once')

        e.currentTarget.removeEventListener(e.type, cb, false)
    }, false)


    /***
     * second solution
     */
    function once(node, etype, callback) {
        node.addEventListener(etype, function(e) {
            e.target.removeEventListener(e.type, arguments.callee, false)
            return callback(e)
        }, false)
    }
} ())