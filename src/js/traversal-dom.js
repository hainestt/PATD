
let callback = function (el) {
    console.log(el)
}

let fn1 = function(node) {
                
    // if (node.nodeType === 1) {
        // if (cb !== undefined) {
            if (node.hasChildNodes()) {
                let subNodes = node.childNodes
                subNodes.forEach(el=> {

                    let a = el.hasChildNodes()
                    callback(el)
                    fn(el)
                })
            } else {
                callback(node)
            }
        // }
    }
// }



let fn = function (node, cb) {

    let fns = function (node) {
            if (node.hasChildNodes()) {
                let subNodes = node.childNodes
                subNodes.forEach(el => {
                    cb(el)
                    fns(el)
                })
            }
    }

    fns.call(null, node)
}

fn(document.querySelector('#node'), callback)

