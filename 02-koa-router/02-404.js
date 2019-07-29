const Koa = require('koa')
const Router = require('./Router')
const app = new Koa()
const router =  new Router();
// app.use(async (ctx, next) => {
//   const { url, method } = ctx;
//   if (url === '/404' && method === 'GET') {
//     ctx.body = 'Page Not Found'
//     ctx.status = 404
//   } else {
//     ctx.body = 'Default Content'
//   }
//   await next()
// })
router.get('/404', async (ctx, next) => {
  ctx.body = 'Page not Found';
  ctx.status = 404;
  await next();
})
app.use(router.routes());
app.listen(4000)