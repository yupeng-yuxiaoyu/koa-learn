const Koa = require('koa')
const Router = require('koa-router')
const path = require('path')
const staticFiles = require('koa-static')
const fs = require('fs')
const app = new Koa();
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)

const router = new Router()

router.get('/', (ctx, next) => {
  ctx.type = 'text/html'
  ctx.body = fs.createReadStream('./fe/teamwork-note/dist/index.html')
})

app.use(staticFiles(path.resolve(__dirname, './static')))
app.use(router.routes())

io.on('connection', (socket) => {
  socket.on('changeMessage', msg => {
    console.log('msg :', msg);
    io.emit('changeMessage', msg);
  })
  socket.on('disconnect', () => {
    console.log('用户离开');
  })
})
server.listen(3000, () => {
  console.log('listening on 3000');
});