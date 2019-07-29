const Koa = require('koa');
const Route = require('koa-router');
const app = new Koa();
const router = new Route();
router.all('/*', async (ctx, next) => {
  // all一般用来设置请求头 如设置过期时间 CORS等
  ctx.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8081')
  await next();
}).get('/', async (ctx, next) => {
  // ctx.body = 'hello world';
  ctx.redirect(ctx.router.url('eat', {
    fruit: 'apple'
  }));
  await next();
}).all('/users', async (ctx, next) => {
  ctx.body = '获取用户成功';
  await next();
}).post('/users/:id', async (ctx, next) => {
  ctx.body = '添加用户成功';
  await next();
}).put('/users/:id', async (ctx, next) => {
  ctx.body = '修改用户成功';
  await next();
}).del('/users/:id', async (ctx, next) => {
  ctx.body = '删除用户成功';
  await next();
});
router.get('eat', '/eat/:fruit', (ctx, next) => {

  ctx.body = ctx.params.fruit;
});
/*
  多中间件 router.get(url, handler, handler);
*/
console.log(router.url('eat', {
  fruit: 'apple'
}));
app.use(router.routes());
app.listen(4000);