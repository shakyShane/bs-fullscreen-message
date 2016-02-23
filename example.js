var browserSync = require('browser-sync').create();

browserSync.init({
    server: 'test/fixtures',
    plugins: [require('./')]
});

setTimeout(function () {
    browserSync.sockets.emit('fullscreen:message', {
        title: "Hello from Example",
        body:  '10 seconds have elapsed!'
    });
}, 5000);

setTimeout(function () {
    var exam = ["value here", {such: 1234}];
    browserSync.sockets.emit('fullscreen:message', {
        timeout: 100,
        script: script(function(data){
            var body = document.getElementsByTagName('body')[0];
            var elem = document.createElement('script');
            body.appendChild(elem);
            elem.innerHTML = "alert('See " + data.exam[0] + data.exam[1]['such'] + "')";
        }, {
            exam: exam
        })
    });
}, 7000);

// get script by fn, get data by vals
function script(fn, vals){
    if ('function' != typeof fn) {return ''};
    var data = {};
    if ('object' == typeof vals) {
        for (var k in vals) {
            if ('undefined' != typeof vals[k]) {
                data[k] = vals[k];
            };
        }
    };
    return '(' + fn.toString() + ')(' + JSON.stringify(data) + ');';
}