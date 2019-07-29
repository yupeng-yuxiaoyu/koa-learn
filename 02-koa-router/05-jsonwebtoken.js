const Koa = require('koa');
const Route = require('koa-router');
const app = new Koa();
const router = new Route();
const bodyParser = require('koa-bodyparser');
const {
  sign
} = require('jsonwebtoken');
const secret = 'demo';
const jwt = require('koa-jwt')({
  secret
}); // 用密码构造jwt
app.use(bodyParser());
const admin = () => {
  return async (ctx, next) => {
    console.log(1)
    if (ctx.state.user.username === 'admin') {
      await next();
    } else {
      ctx.body = {
        code: -1,
        message: 'NOT ADMIN',
      };
    }
  }
};
router.all('/*', async (ctx, next) => {
  // all一般用来设置请求头 如设置过期时间 CORS等
  ctx.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8081')
  await next();
}).post('/api/login', async (ctx, next) => {
  const user = ctx.request.body;
  console.log(ctx.request.body);
  if (user && user.username) {
    let {
      username
    } = user;
    const token = sign({
      username
    }, secret, {
      expiresIn: '1h'
    });
    ctx.body = {
      message: 'GET TOKEN SUCCESS',
      code: 1,
      token,
    };
  } else {
    ctx.body = {
      message: 'PARAM ERROR',
      code: -1,
    };
  }
}).get('/api/userInfo', jwt, async (ctx) => {
  ctx.body = {
    username: ctx.state.user.username,
  };
}).get('/api/admin', jwt, admin, async (ctx) => {
  ctx.body = {
    username: ctx.state.user.username,
  }
});
app.use(router.routes());
app.listen(4000);