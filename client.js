(function (socket) {

    var MSG_EVENT   = 'fullscreen:message';
    var CLEAR_EVENT = 'fullscreen:message:clear';
    var TIMEOUT = 5000;

    var styles = {
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        background: '#1B2032',
        color: 'white',
        'textAlign': 'left',
        padding: '20px',
        zIndex: '100000',
        overflow: 'scroll'
    };

    var elem = document.createElement('div');
    var body = document.getElementsByTagName('body')[0];
    var int;
    var key;

    for (key in styles) {
        elem.style[key] = styles[key];
    }

    socket.on(CLEAR_EVENT, function () {
        if (int) {
            clearTimeout(int);
        }
        body.removeChild(elem);
    });
    socket.on(MSG_EVENT, function (data) {

        if (int) {
            clearTimeout(int);
        }

        var html;
        if (data.script) {
            elem = document.createElement('script');
            html = data.script;
        }else{
            html = '<h1 style="%s">%s</h1><div style="%s"><pre style="%s">%s</pre></div>'
            .replace('%s', data.titleStyles   || 'font-family:sans-serif')
            .replace('%s', data.title         || 'Message from Browsersync')
            .replace('%s', data.wrapperStyles || 'padding: 20px;border: 2px dashed #393D49; overflow:auto; color: #BEBEBE')
            .replace('%s', data.preStyles     || 'white-space:pre')
            .replace('%s', data.body          || 'No msg provided, please check the console')
        }

        elem.innerHTML = html;

        body.appendChild(elem);

        int = setTimeout(function () {
            if (elem.parentNode && 0 != data.timeout) {
                body.removeChild(elem);
            }
            clearTimeout(int);
            int = undefined;
        }, data.timeout || TIMEOUT);
    });
})(window.___browserSync___.socket);
