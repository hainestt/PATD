
let duplicate = function(arr) {
    let obj = {}
    let res = []

    for (let i = 0, len = arr.length; i < len; i++) {
        if (!obj[arr[i]]) {
            res.push(arr[i])
            obj[arr[i]] = true
        }
    }

    return res
}

let arr = [1,2,3,4,5,5,5,5,5,6,7,8,9,10,11]

let res = duplicate(arr)

console.log(res)

