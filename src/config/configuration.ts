export default () => ({
  appEnv: process.env.APP_ENV || 'develop',
  port: parseInt(process.env.PORT, 10) || 6661,
  database: {
    url: process.env.DATABASE_URL,
  },
  mail: {
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT, 10),
    secure: Boolean(process.env.MAIL_SECURE),
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
    from: process.env.MAIL_FROM,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10),
    password: process.env.REDIS_PASSWORD,
  },
});
