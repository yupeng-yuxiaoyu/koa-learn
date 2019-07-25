const Koa = require('koa');
const Router = require('koa-router')
const app= new Koa();
const router = new Router();
router.get('/',async (ctx, next) => {
  ctx.type = 'text/html';
  ctx.body = '<h1>index</h1>';
  ctx.status = 200;
});
app.use(router.routes());
app.listen(3000)
