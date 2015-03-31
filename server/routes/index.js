import { default as express, Router } from 'express'
import { ClientRenderer, PageContext } from '../middleware'
let router = new Router();

router.use(PageContext())

router.get('/*', [ ClientRenderer() ], (req, res)=> {
	res.render('index', { 
		title: 'Flux Capacitor', 
		appHtml: res.locals.appHtml
	})
})

export default router
