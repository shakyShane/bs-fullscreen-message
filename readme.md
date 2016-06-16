## bs-fullscreen-message

> Overlay a fullscreen message to all browsers

Useful for showing errors from webpack/browserify/gulp etc

## Install

```shell
npm i browser-sync bs-fullscreen-message
```

## Usage

```js
var browserSync = require('browser-sync').create();

browserSync.init({
    server: 'test/fixtures',
    plugins: ['bs-fullscreen-message']
});

// Emit an event to connected clients
setTimeout(function () {
    browserSync.sockets.emit('fullscreen:message', {
        title: "Hello from Example",
        body:  '10 seconds have elapsed!'
    });
}, 5000);
```

### Example from `webpack.babel` recipe

Checkout the example here https://github.com/BrowserSync/recipes/blob/master/recipes/webpack.babel/app.js

![fullscreen](https://s31.postimg.org/cfa3zg3fv/Screen_Shot_2016_06_16_at_09_15_30.png)

### Example from using `gulp-sass` plugin

![fullscreen](https://s31.postimg.org/rcil0ggob/Screen_Shot_2016_06_16_at_09_14_03.png)
