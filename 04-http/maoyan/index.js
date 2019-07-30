const Koa = require('koa')
const Router = require('koa-router')
const Service = require('./service')
const app = new Koa()
const router = new Router()

router.get('/', async (ctx, next) => {
  ctx.body = await Service.search()
  await next()
})
app.use(router.routes())
app.listen(8081)