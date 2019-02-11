module.exports = {
  pgHost: process.env.POSTGRES_HOST,
  pgUser: process.env.POSTGRES_USER,
  pgPassword: process.env.POSTGRES_PASSWORD,
  pgDatabase: process.env.POSTGRES_DATABASE,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT
}
