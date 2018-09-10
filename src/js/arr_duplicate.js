(function () {
    Array.prototype.duplicate = function () {
        var result = [],
            obj = {}

        for (var i = 0; i < this.length; i++) {
            if(!obj[this[i]]) {
                result.push(this[i])
                obj[this[i]] = 1
            }
        }
        return result
    }

    var arr = [12,23,3,4,4,5,'测试', 9]
    console.log(arr.duplicate())

    var quickSort = function (arr) {
        if (arr.length <= 1) {
            return arr
        }
        var mindex = Math.floor(arr.length / 2),
            m = arr.splice(mindex, 1)[0]


    }
}())