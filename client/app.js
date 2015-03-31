import { default as React } from 'react'
import { default as Router } from 'react-router'
import { default as Iso } from 'iso'
import { default as Alt } from '../lib/services/alt'
import { default as routes } from './routes'

export function run() {
  Iso.bootstrap(function (state, metaData, container) {
    Alt.bootstrap(state);
    Router.run(routes, Router.HistoryLocation, (Handler) => {
      React.render(<Handler />, document.body);
    });
  });
}

export function render(payload, cb) {
  var iso = new Iso(),
      url = payload.url,
      data = typeof payload.data === 'string' ? payload.data : JSON.stringify(payload.data || {});
  Alt.bootstrap(data);
  Router.run(routes, url, function (Handler) {
    var html = React.renderToString(<Handler />);
    iso.add(html, Alt.flush());
    cb(iso.render());
  });
}