import { default as React } from 'react'
import { RouteHandler } from 'react-router'
import { Debug } from './debug'

export var App = React.createClass({

	render() {
		return <div>
      <RouteHandler />
      <Debug />
    </div>
	}

})