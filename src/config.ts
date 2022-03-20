const config = {
  server_port: process.env.server_port || 1368,
  ws_port: process.env.ws_port || 1369,
  mongodb_uri: process.env.mongodb_uri || 'mongodb://root:root@localhost:27018',
  elasticsearch_uri: process.env.elasticsearch_uri || 'http://localhost:9211',
  redis_host: process.env.redis_host || 'localhost',
  redis_port: process.env.redis_port || 6378,
  redis_db: process.env.redis_db || 10,
  jwt_secret: process.env.jwt_secret || 'i_dont_know',
  salt_round: 10,
}

export default config
