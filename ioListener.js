const writeFile = require('./writeFile')

module.exports = function(io){
  // 创建一个 命名空间
  let namespaceMain = io.of('/main')
  // io.join('room1')

  // main 命名空间
  namespaceMain.on('connection', ()=>{
    console.log('main namespace connected')
  })

  let rooms = []

  // 默认的命名空间 '/'
  io.on('connection', (socket) => {
    console.log(`io listener: a user connected, id: ${socket.id}, time: ${socket.handshake.time.toString().split(' ')[4]}`)

    // 加入房间 aaaa
    rooms.push('aaaa')
    socket.join('aaaa')

    // 监听 message 事件，貌似没有回调的
    socket.on('message', (msg) => {
      console.log(`events: message, datas: ${msg}`)
    })

    // 监听自定义的事件 ，回调函数 data 是传递的数据 fn 就是客户端的回调函数
    socket.on('c_notice', (msg, cb_fn) => {
      console.log(`event: notice, datas: ${msg}`)

      cb_fn(`${msg} world!`)

      socket.emit('s_notice', `服务器发射的事件:'s_notice', datas: server--${msg}`)

      //向指定的命名空间发射事件
      namespaceMain.emit('s_notice', `服务器发射的事件:'s_notice', datas: server--${msg}`)
    })

    // 广播消息 socket.broadcast.emit
    socket.on('c_broadcastMsg', (msg)=>{
      console.log(`c_broadcastMsg: ${msg}`)
      socket.broadcast.emit('s_broadcastMsg', `广播的信息：${msg}`)
    })

    socket.on('c_getSocketData',(data)=>{
      console.log(`c_getSocketData: ${data}`)
      // 广播到所有当前命名空间下的客户端 
      socket.broadcast.emit('s_returnSocket', socket.rooms)
      // io.sockets.emit('returnSocket', socket.rooms)
      writeFile('/sockets.json', io.sockets)
    })

    socket.on('c_localEmitMsg', (data)=>{
      console.log(`c_localEmitMsg: ${data}`)
      io.local.emit('s_returnSocket', data)
    })

    socket.on('c_createRoom', (homeid)=>{
      console.log('c_createRoom: '+homeid)
      rooms.indexOf(homeid) === -1 ? rooms.push(homeid) : ''

      io.local.emit('s_returnRooms', JSON.stringify(socket.rooms))
    })

    socket.on('c_joinRoom', (homeid)=>{
      console.log('c_joinRoom')
      socket.join(homeid)
      // socket.rooms 当前所有的rooms
      console.log(socket.rooms)
    })

    // 向room中的客户端发信息
    socket.on('c_sendToRoom', (homeid)=>{
      console.log('c_sendToRoom: '+homeid)
      io.to(homeid).emit('s_sendToRoom', '666')
    })

  })

}