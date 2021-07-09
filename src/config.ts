const config = {
  server_port: process.env.server_port,
  ws_port: process.env.ws_port,
  mongodb_uri: process.env.mongodb_uri,
  elasticsearch_uri: process.env.elasticsearch_uri,
  redis_host: process.env.redis_host,
  redis_port: process.env.redis_port,
  redis_db: process.env.redis_db,
  jwt_secret: process.env.jwt_secret,
  salt_round: 10,
}

export default config
