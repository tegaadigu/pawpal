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
  /**
  @@@@@ Please do not overrite this file - this was automatically created using pnpm run api-client:generate @@@@@@
  @@@@ maintainer: Tega Adigu @@@@@ 
  ----------------------------------------
  */

  
  export class ApiClient {
      headers = {
        'Content-Type': 'application/json',
      }
    
      /**
       * @param {${keys.map(key => `{ ${key}: { url: string}}`)}} [services]
       * @param {string} refreshTokenUrl
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
       * _fetch helper
       * @param {string} url
       * @param {RequestInit} args
       */
      _fetch = async (url, args) => {
        const token = localStorage.getItem('token')
        if (token) {
          args.headers = {
            ...args.headers,
            Authorization: \`Bearer \${token}\`,
          }
        }
        const res = await fetch(url, args)
        const needToRefreshToken = res.headers.get('X-Refresh-Token') != null
        if (needToRefreshToken) {
          const refreshTokenRes = await fetch(\`\${this._getUrl('auth')}/auth/refresh-token\`, {
            method: 'POST',
            headers: args.headers,
            credentials: 'include',
          })
          const refreshTokenData = await refreshTokenRes.json()
          const { token } = refreshTokenData
          localStorage.setItem('token', token)
        }
        return res
      }
    `
}