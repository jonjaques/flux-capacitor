import { default as React } from 'react'
import { Route, NotFoundRoute, DefaultRoute } from 'react-router'
import { App } from '../lib/components/app'
import { Home } from '../lib/components/home'
import { NotFound } from '../lib/components/error'

export default (
  <Route handler={App}>
    <DefaultRoute handler={Home} />
    <NotFoundRoute name="404" handler={NotFound} />
  </Route>
)