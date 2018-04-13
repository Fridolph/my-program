const Koa = require('koa')
const path = require('path')
const app = new Koa()
const router = require('koa-router')()
const koaSend = require('koa-send')
const koaStatic = require('koa-static')
const pageStr = require('./public/homeStr')

const homeRouter = router.get('/', async (ctx, next) => {
  ctx.body = pageStr
})

app.use(koaStatic(path.join(__dirname, 'public')))

app.use(homeRouter.routes()).use(homeRouter.allowedMethods())

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await koaSend(ctx, '/favicon.ico', { root: path.join(__dirname, './') })
  } else {
    await next()
  }
})

app.listen(8000, () => {
  console.log('server is running at http://127.0.0.1:8000')
})