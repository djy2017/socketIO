const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const server = http.Server(app)
const io = require('socket.io')(server)
const expressRouter = require('./expressRouter')
const ioListener = require('./ioListener')

// const userIo = io.of('/user')

// 设置静态文件的路径 （express）
app.use(express.static(path.join(__dirname, '/static')))
let port = 5200

// 服务器 监听端口
server.listen(port, function(){
  console.log(`listening on *: http://127.0.0.1:${port}`);
})

// express 路由
expressRouter(app)

// io监听
ioListener(io)
