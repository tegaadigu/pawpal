export const PROJECT_TYPE = Object.freeze({
  FRONTEND: 'frontend',
  BACKEND: 'backend',
  BOTH: 'both'
});


export const PATHS = Object.freeze({
  BACKEND:'services/packages/',
  FRONTEND: 'web/packages/'
})

export const DEFAULT_PREFIX = 'pawpal-'

export const BACKEND_SERVICE_TYPES = Object.freeze({
  RESTFUL: 'restful',
  EVENT_DRIVEN: 'event-driven'
})


/**
 * @typedef {Object} Env
 * @property {string} PORT
 * @property {string} HOST
 * @property {stirng} DB_PORT
 * @property {string} DB_USER
 * @property {string} DB_PASSWORD
 * @property {string} DB_NAME
 * @property {string} LOG_LEVEL
 */