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
    browserSync.sockets.emit('fullscreen:message', {
        timeout: 0,
        script: script(function(){
            var body = document.getElementsByTagName('body')[0];
            var elem = document.createElement('script');
            body.appendChild(elem);
            elem.innerHTML = "alert('other message or act')";
        })
    });
}, 10000);

// get script by fn
function script(fn){
    if ('function' != typeof fn) {return ''};
    return '('+ fn.toString() +')();';
}