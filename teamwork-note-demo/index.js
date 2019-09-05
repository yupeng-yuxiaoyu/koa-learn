const Koa = require('koa')
const Router = require('koa-router')
const path = require('path')
const staticFiles = require('koa-static')
const router = new Router()
const WebSocket = require('ws');

const app = new Koa();
app.use(staticFiles(path.join(__dirname)))

const ws = new WebSocket.Server({port: 8888});

ws.on('connection', ws => {
    console.log('服务连接');

    ws.on('message', msg => {
      console.log('接收到消息：', msg);
      ws.send(msg);
    });
    ws.send('这是连接之后从服务器发过来的一条信息');
});
router.get('/', async(ctx, next) => {
  ctx.body = 'index'
  await next()
});
app.use(router.routes())
app.listen(4000);