import { render } from '../client/app'

export function ClientRenderer() {
  return function(req, res, next) {
    res.locals.appHtml = ''
    var clientData = res.locals.appData;
    render({
      url: req.url,
      data: {}
    }, function(html) {
      res.locals.appHtml = html
      next();
    })
  }
}

export function PageContext() {
  return function(req, res, next) {
    res.locals.appContext = {}
    return next();
  }
}