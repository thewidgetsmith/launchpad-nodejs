import http from 'http'
import path from 'path'
import { URL } from 'url'

import Pino from 'pino'
import PinoHttp from 'pino-http'
import PinoInspector from 'pino-inspector'
import OracleDB from 'oracledb'
import Sentry from '@sentry/node'
import express from 'express'

/**
 * app setup variables
 */
// const __filename = new URL('', import.meta.url).pathname
const __dirname = new URL('.', import.meta.url).pathname
const publicDir = path.resolve(__dirname, '..', 'public')

const appId = `${process.env.npm_package_name}@${process.env.npm_package_version}`
const isDev = false // process.env.NODE_ENV !== 'production'

/**
 * Setup Sentry client
 */
Sentry.init({
  dsn: '',
  release: appId,
  enabled: false,
  environment: isDev ? 'development' : 'production'
})

/**
 * Setup logger instance
 */
let pinoConfig = {
  name: appId,
  level: 'info'
}

if (isDev) {
  pinoConfig = {
    ...pinoConfig,
    level: 'debug',
    colorize: true,
    prettyPrint: true,
    // pino-inspector transforms the debug log output into something
    // more like the Chrome Devtools console (better developer exp)
    prettifier: PinoInspector
  }
}

const logger = Pino(pinoConfig)
const log = logger.child({ module: 'app' })

/**
 *  initialize Express app
 */
const app = express()

/**
 * Get port from environment and store in Express.
 * Normalize a port into a number, string, or false.
 */
let port;
(() => {
  const env = process.env.APP_PORT || '3000'
  const int = parseInt(env, 10)
  // if int is a named pipe, or number greater than 0
  port = isNaN(int) ? env : ((int >= 0) ? int : false)
})()

app.set('port', port)

/**
 * remove 'X-POWERED-BY' response header
 */
app.disable('x-powered-by')

/**
 * setup Express middlewares
 * - Sentry HTTP error handler
 * - Pino HTTP request logging handler
 */
app.use(Sentry.Handlers.errorHandler())
app.use(PinoHttp({
  autoLogging: {
    // Do not log the following paths (no health check logs)
    ignorePaths: [
      '/health-check'
    ]
  },
  logger
}))

/**
 * Setup Express Route Handlers
 */
app.get('/', (_, res) => {
  res.sendFile(path.resolve(publicDir, 'index.html'))
})

app.get('/env_test', (_, res) => {
  res.status(200).json({ test_val: process.env.ENV_TEST_VALUE })
})

const DB_TEST_STATEMENT = `\
SELECT
    spriden_pidm pidm
FROM
    spriden
WHERE spriden_change_ind IS null
    AND spriden_id = :p_username
`

app.get('/db_test/:username', (req, res) => {
  const { username } = req.params
  const getConn = () =>
    OracleDB.getConnection({
      user: process.env.ORACLE_DB_USER,
      password: process.env.ORACLE_DB_PASS,
      connectString: process.env.ORACLE_DB_URL
    })

  getConn()
    .then((conn) => conn.execute(DB_TEST_STATEMENT, { p_username: username }))
    .then((result) => res.status(200).json({ username, result }))
    .catch((err) => res.status(500).json({ error: err.message }))
})

// ----[HTTP SERVER SETUP] ------------------------------------------------------------------------------------------ //

/**
 * Create HTTP server.
 */
const server = http.createServer(app)

/**
 * Event listener for HTTP server "listening" event.
 */
server.on('listening', () => {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  log.warn({ bind }, 'startup completed')
})

/**
 * Event listener for HTTP server "error" event.
 */
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with descriptive messages
  if (error.code === 'EACCES') {
    log.error({ bind, error: 'EACCES: Bind requires elevated privileges' }, 'startup failed')
    process.exit(1)
  }

  if (error.code === 'EADDRINUSE') {
    log.error({ bind, error: 'EADDRINUSE: Bind is already in use' }, 'startup failed')
    process.exit(1)
  }

  throw error
})

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port)

/**
 * simple function exported for example test
 */
export const testFunc = (base, exp) => Math.pow(base, exp)
