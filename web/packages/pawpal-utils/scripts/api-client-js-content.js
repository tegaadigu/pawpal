export const getApiClientJSContent = (apiClient) => {
  const serviceUrls = {};
  const keys = []
  for (const [namespace, functions] of Object.entries(apiClient)) {
    const { baseUrl } = functions;
    keys.push(namespace)
    if (baseUrl) {
      serviceUrls[namespace] = {
        url: baseUrl
      }
    }
  }
  return `

  // @ts-nocheck

  /**
  @@@@@ Please do not overrite this file - this was automatically created using pnpm run api-client:generate @@@@@@
  @@@@ maintainer: Tega Adigu @@@@@ 
  ----------------------------------------
  */

  export class ApiError extends Error {
      /**
       * @param {string} message
       * @param {number} statusCode 
       */
    constructor(message, statusCode) {
      super(message)
      this.name = "ApiError"
      this.statusCode = statusCode || 500
      Error.captureStackTrace(this, this.constructor)
    }
  }

  
  export class ApiClient {
      headers = {
        'Content-Type': 'application/json',
      }
    
      /**
       * @param {${keys.map(key => `{ ${key}: { url: string}}`)}} [services]
       */
      constructor(services = null) {
        this.services = services || ${JSON.stringify(serviceUrls)}
      }


       /**
       * @param {string} appName
       * @return {string}
       */
      _getUrl = (appName) => {
        if(!this.services[appName]) {
          throw new Error(appName + ': does not exist')
        }
        
        return this.services[appName].url
      }

      /**
       * @param {Object} headers
       * @param {string} token
       * @return {Object}
       */ 
      _getHeaders = (headers, token) => {
        if (token) {
          headers.Authorization = \`Bearer \${token}\`
        }
        return {
          ...this.headers,
          ...headers,
        }
      }

      /**
       * @param {string} url
       * @param {RequestInit} args
       * @return {Object}
       */
      _makeRequest = async (url, args) => {
        const response = await fetch(url, args)
        return response
      }

      /**
       * @return {string}
       */
      _getToken = () => {
        return localStorage.getItem('token')
      }

      /**
       * @return {void}
       */
      _handleRefreshToken = async () => {
        const refreshTokenRes = await fetch(\`\${this._getUrl('auth')}/auth/refresh-token\`, {
          method: 'POST',
          headers: args.headers,
          credentials: 'include',
        })

        const refreshTokenData = await refreshTokenRes.json()
        const { token } = refreshTokenData
        localStorage.setItem('token', token)
      }

      /**
       * _fetch helper
       * @param {string} url
       * @param {RequestInit} args
       * @throws {ApiError | Error}
       */
      _fetch = async (url, args) => {
        try {
        const token = this._getToken()
        const headers = this._getHeaders(args.headers, token)

        const response = await this._makeRequest(url, { ...args, headers })
        
        if (response.headers.get('X-Refresh-Token')) {
            await this._handleRefreshToken()
          }

          const responseData = await response.json();
          if(response.ok) {
            return responseData
          }

          throw new ApiError(responseData.message, response.status)
        } catch (error) {
          console.error(error)
          throw error
        }
      }
    `
}