import bunyan from 'bunyan'

/**
 * Create Logger
 * @param {string} serviceName
 * @param {string} logLevel
 * @returns {ReturnType<import("bunyan").createLogger>}
 */
export function createLogger(serviceName, logLevel) {
  const globalSymbols = Object.getOwnPropertySymbols(global)
  const haveLogger = globalSymbols.indexOf(serviceName) > -1
  if (!haveLogger) {
    global[serviceName] = bunyan.createLogger({
      name: serviceName,
      streams: [
        {
          level: logLevel,
          stream: process.stdout,
        },
      ],
      serializers: bunyan.stdSerializers,
    })
  }
  const singleton = {}
  Object.defineProperty(singleton, 'instance', {
    get: function () {
      return global[serviceName]
    },
  })
  // ensure the API is never changed
  // -------------------------------
  Object.freeze(singleton)
  return singleton.instance
}

/**
 * Get log level
 * @param {string} strLogLevel
 * @returns {number}
 */
export const getBunyanLogLevel = (strLogLevel) => {
  switch (strLogLevel) {
    case 'TRACE':
      return bunyan.TRACE
    case 'DEBUG':
      return bunyan.DEBUG
    case 'INFO':
      return bunyan.INFO
    case 'WARN':
      return bunyan.WARN
    case 'ERROR':
      return bunyan.ERROR
    default:
      return bunyan.INFO
  }
}

export const logger = createLogger('pawpal', 'INFO')
