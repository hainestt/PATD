/**
 * DOM
 */

 //窗口可视范围的高度 
function getClientHieght () {
    let clientHeight = 0

    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight
    } else {
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight
    }

    return clientHeight
}

//窗口滚动条高度 
function getScrollTop () {
    var scrollTop=0

    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop=document.documentElement.scrollTop
    } else if (document.body){
        scrollTop=document.body.scrollTop 
    }
    return scrollTop
}

//文档内容实际高度 
function getDomHeight () {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
}