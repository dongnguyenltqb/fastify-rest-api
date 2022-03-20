import * as ws from 'ws'
import config from './config'
import logger from './utils/logger'

type HandleFn = (...args: unknown[]) => void
type wsMessage = {
  event: string
  data: unknown
}
interface WsServer extends ws.Server {
  sendJsonTo?: (
    roomId: string,
    event: string,
    data: unknown,
    local: boolean,
  ) => void
  broadcast?: (event: string, data: unknown) => void
}

interface CustomWebsocket extends ws.WebSocket {
  id: string
  isAlive: boolean
  rooms: string[]
  sendJSONTo: (roomId: string, event: string, data: unknown) => void
  sendJSON: (event: string, data: unknown) => void
  broadcast: (event: string, data: unknown) => void
  handleFuncs: Map<string, HandleFn>
  register: (event: string, func: HandleFn) => void
  join: (roomId: string) => void
  leave: (roomId: string) => void
}

function heartbeat() {
  this.isAlive = true
}

function sendJSONTo(roomId: string, event: string, data: unknown) {
  wss.clients.forEach(function each(client: CustomWebsocket) {
    if (client.readyState === ws.OPEN && client.rooms?.indexOf(roomId) >= 0) {
      client.sendJSON(event, data)
    }
  })
}

function sendJSON(event: string, data: unknown) {
  this.send(JSON.stringify({ event, data }))
}

function broadcast(event: string, data: string) {
  wss.clients.forEach(function each(client: CustomWebsocket) {
    if (client.readyState === ws.OPEN) {
      client.sendJSON(event, data)
    }
  })
}

function register(event: string, func: HandleFn) {
  const funcs = this.handleFuncs.get(event) || []
  funcs.push(func)
  this.handleFunc.set(event, funcs)
}
function join(roomId: string) {
  if (this.rooms.indexOf(roomId) < 0) {
    this.rooms.push(roomId)
  }
}
function leave(roomId: string) {
  this.rooms = this.rooms.filter((r: string) => r !== roomId)
}

function onMessage(textMessage: string) {
  try {
    const message: wsMessage = JSON.parse(textMessage)
    const { event, data } = message
    logger.info(`[WS SERVER] on ${event} from ${this.id}`)
    const funcs = this.handleFunc.get(event)
    if (funcs) {
      for (const func of funcs) {
        func.bind(this)(data)
      }
    }
  } catch (err) {
    logger.error(err)
  }
}

function onCloseWs() {
  this.handleFuncs.clear()
}

const wss: WsServer = new ws.WebSocketServer({ port: Number(config.ws_port) })
logger.info(`Websocket => ${config.ws_port}`)

wss.on('connection', function connection(ws: CustomWebsocket) {
  ws.isAlive = true
  ws.id = Math.random().toString()
  ws.rooms = []
  ws.handleFuncs = new Map()
  ws.on('pong', heartbeat)
  ws.register = register
  ws.sendJSON = sendJSON
  ws.sendJSONTo = sendJSONTo
  ws.broadcast = broadcast
  ws.join = join
  ws.leave = leave
  handleConnection(ws)
})

async function handleConnection(ws: CustomWebsocket) {
  ws.join(ws.id)
  ws.sendJSONTo(ws.id, 'id', ws.id)
  ws.on('close', onCloseWs)
  ws.on('message', onMessage)
}

const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws: CustomWebsocket) {
    if (ws.isAlive === false) return ws.terminate()

    ws.isAlive = false
    ws.ping()
  })
}, 10_000)

wss.on('close', function close() {
  clearInterval(interval)
})

export default wss
