(function (doc) {
    var cvs = doc.querySelector('#mcanvas'),
        ctx = cvs.getContext('2d'),
        video = doc.createElement('video'),
        cw = window.innerWidth,
        ch = window.innerHeight
    
    cvs.width = cw
    cvs.height = ch

    video.preload = 'auto'
    video.src = '../temp/game-zh.mp4'
    video.autoplay = 'autoplay'
    video.loop = 'loop'

    video.addEventListener('play', function () {
        var ctx2 = cerateCanvas(cw, ch).getContext('2d')
        draw(this, ctx, ctx2, cw, ch)
    }, false)

    function cerateCanvas(w, h) {
        var cr = doc.createElement("canvas");
        cr.width = w;
        cr.height = h;
        return cr;
    }

    function draw(v, c, c2, w, h) {
        if (v.paused || v.ended) {
            cancelAnimationFrame(stop)
            return false
        }
        c2.drawImage(v, 0, 0, w, h)
        var idata = c2.getImageData(0, 0, w, h),
            data = idata.data,
            l = data.length / 4
        
        for (var i = 0; i < l; i += 4) {
            var r = data[i * 4 + 0],
                g = data[i * 4 + 1],
                b = data[i* 4 + 2]

            if (g > 100 && r > 100 && b < 43){
                data[i * 4 + 3] = 0;
            }
        }

        idata.data = data
        c.putImageData(idata, 0, 0)
        var stop = requestAnimationFrame(function() {
            draw(v, c, c2, w, h)
        })
    }

}(document))