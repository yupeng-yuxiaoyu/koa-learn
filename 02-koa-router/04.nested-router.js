const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const forums = new Router();
const posts = new Router();
posts.get('/', (ctx, next) => {
  ...
});
posts.get('/:pid', (ctx, next) => {
  ...
});
forums.use('/forums/:fid/posts', posts.routes(), post.allowedMethods());
// 获取互联网板块列表的接口
// /forums/:fid/posts => /forums/123/posts
// 获取互联网板块下某篇文章的接口
// /forums/:fid/posts/:pid => /forums/123/posts/456
app.use(forums.routes());