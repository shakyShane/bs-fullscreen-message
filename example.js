var browserSync = require('browser-sync').create();

browserSync.init({
    server: true
});

setTimeout(function () {
    browserSync.sockets.emit('fullscreen:message', {
        title: "Hello from Example",
        body:  '10 seconds have elapsed!'
    });
}, 10000);
