(function (socket) {

  var MESSAGE_EVENT   = 'fullscreen:message';
  var MESSAGE_CLEAR_EVENT = 'fullscreen:message:clear';

  var styles = {
    'opacity': 0.98,
    'padding': '1rem',
    'position': 'absolute',
    'top': 0,
    'left': 0,
    'background-color': '#CA0612',
    'width': '100%',
    'height': '100%',
    'z-index': 5000,
    'color': 'white'
  };

  var elem = document.createElement('div');
  var body = document.getElementsByTagName('body')[0];
  var key;

  for (key in styles) elem.style[key] = styles[key];

  socket.on(MESSAGE_CLEAR_EVENT, function () {
    if (elem.parentNode) body.removeChild(elem);
  });

  socket.on(MESSAGE_EVENT, function (data) {
    elem.innerHTML = '<h1 style="%s">%s</h1><div style="%s"><pre style="%s">%s</pre></div>'
        .replace('%s', data.titleStyles   || '')
        .replace('%s', data.title         || 'Message from Browsersync')
        .replace('%s', data.wrapperStyles || '')
        .replace('%s', data.preStyles     || 'white-space:pre')
        .replace('%s', data.body          || 'No msg provided, please check the console')

    body.appendChild(elem);
  });
})(window.___browserSync___.socket);
