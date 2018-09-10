
debugger

function foo () {
    debugger
    console.log(a)
}

function bar () {
    debugger
    var a = 3
    foo()
}

var a = 2
bar()