import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import config from './config'
import logger from './utils/logger'

const httpServer = createServer()
const io = new Server(httpServer, {
  serveClient: true,
})

io.on('connection', (socket: Socket) => {
  socket.emit('HelloWorld')
})

httpServer.listen(config.ws_port)
logger.info('[Websocket]=> ' + config.ws_port)

export default io
