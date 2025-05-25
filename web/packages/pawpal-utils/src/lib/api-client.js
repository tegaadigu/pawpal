/**
  @@@@@ Please do not overrite this file - this was automatically created using pnpm run api-client:generate @@@@@@
  @@@@ maintainer: Tega Adigu @@@@@ 
  ----------------------------------------
  */

class ApiError extends Error {
  /**
   * @param {string} message
   * @param {number} statusCode
   */
  constructor(message, statusCode) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode || 500
    Error.captureStackTrace(this, this.constructor)
  }
}

export class ApiClient {
  headers = {
    'Content-Type': 'application/json',
  }

  /**
   * @param {{ auth: { url: string}},{ orders: { url: string}},{ payments: { url: string}},{ places: { url: string}},{ store: { url: string}}} [services]
   * @param {string} refreshTokenUrl
   */
  constructor(services = null) {
    this.services = services || {
      auth: { url: 'http://0.0.0.0:3001' },
      orders: { url: 'http://0.0.0.0:3003' },
      payments: { url: 'http://0.0.0.0:3000' },
      places: { url: 'http://0.0.0.0:3004' },
      store: { url: 'http://0.0.0.0:3002' },
    }
  }

  /**
   * @param {string} appName
   * @return {string}
   */
  _getUrl = (appName) => {
    if (!this.services[appName]) {
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
      headers.Authorization = `Bearer ${token}`
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
    const refreshTokenRes = await fetch(`${this._getUrl('auth')}/auth/refresh-token`, {
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

      const responseData = await response.json()
      if (response.ok) {
        return responseData
      }

      throw new ApiError(responseData.message, response.status)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  auth = {
    /**
     * login
     
     * @param {RequestInit} args
    */
    login: (args) => {
      let url = `${this._getUrl('auth')}/api/v1/login`

      return this._fetch(url, {
        method: 'POST',
        ...args,
        headers: {
          ...this.headers,
          ...args?.headers,
        },
        credentials: 'include',
      })
    },
    /**
     * registerUser
     
     * @param {RequestInit} args
    */
    registerUser: (args) => {
      let url = `${this._getUrl('auth')}/api/v1/register`

      return this._fetch(url, {
        method: 'POST',
        ...args,
        headers: {
          ...this.headers,
          ...args?.headers,
        },
        credentials: 'include',
      })
    },
    /**
     * getUser
     
     * @param {RequestInit} args
    */
    getUser: (args) => {
      let url = `${this._getUrl('auth')}/api/v1/user`

      return this._fetch(url, {
        method: 'POST',
        ...args,
        headers: {
          ...this.headers,
          ...args?.headers,
        },
        credentials: 'include',
      })
    },
  }

  orders = {
    /**
     * createOrder
     
     * @param {RequestInit} args
    */
    createOrder: (args) => {
      let url = `${this._getUrl('orders')}/api/v1/order`

      return this._fetch(url, {
        method: 'POST',
        ...args,
        headers: {
          ...this.headers,
          ...args?.headers,
        },
        credentials: 'include',
      })
    },
    /**
     * getOrder
     * @param {string} orderId
     * @param {RequestInit} args
     */
    getOrder: (orderId, args) => {
      let url = `${this._getUrl('orders')}/api/v1/order/{orderId}`
      url = url.replace('{orderId}', orderId)
      return this._fetch(url, {
        method: 'GET',
        ...args,
        headers: {
          ...this.headers,
          ...args?.headers,
        },
        credentials: 'include',
      })
    },
  }

  payments = {
    /**
     * createStore
     
     * @param {RequestInit} args
    */
    createStore: (args) => {
      let url = `${this._getUrl('payments')}/api/v1/store`

      return this._fetch(url, {
        method: 'POST',
        ...args,
        headers: {
          ...this.headers,
          ...args?.headers,
        },
        credentials: 'include',
      })
    },
    /**
     * getStore
     * @param {string} slug
     * @param {RequestInit} args
     */
    getStore: (slug, args) => {
      let url = `${this._getUrl('payments')}/api/v1/store/{slug}`
      url = url.replace('{slug}', slug)
      return this._fetch(url, {
        method: 'GET',
        ...args,
        headers: {
          ...this.headers,
          ...args?.headers,
        },
        credentials: 'include',
      })
    },
    /**
     * createProduct
     * @param {string} slug
     * @param {RequestInit} args
     */
    createProduct: (slug, args) => {
      let url = `${this._getUrl('payments')}/api/v1/store/{slug}/product`
      url = url.replace('{slug}', slug)
      return this._fetch(url, {
        method: 'POST',
        ...args,
        headers: {
          ...this.headers,
          ...args?.headers,
        },
        credentials: 'include',
      })
    },
    /**
     * getProducts
     * @param {string} slug
     * @param {RequestInit} args
     */
    getProducts: (slug, args) => {
      let url = `${this._getUrl('payments')}/api/v1/store/{slug}/products`
      url = url.replace('{slug}', slug)
      return this._fetch(url, {
        method: 'GET',
        ...args,
        headers: {
          ...this.headers,
          ...args?.headers,
        },
        credentials: 'include',
      })
    },
    /**
     * getProductCategories
     * @param {string} slug
     * @param {RequestInit} args
     */
    getProductCategories: (slug, args) => {
      let url = `${this._getUrl('payments')}/api/v1/store/{slug}/products/categories`
      url = url.replace('{slug}', slug)
      return this._fetch(url, {
        method: 'GET',
        ...args,
        headers: {
          ...this.headers,
          ...args?.headers,
        },
        credentials: 'include',
      })
    },
    /**
     * getProduct
     * @param {string} productId
     * @param {RequestInit} args
     */
    getProduct: (productId, args) => {
      let url = `${this._getUrl('payments')}/api/v1/product/{productId}`
      url = url.replace('{productId}', productId)
      return this._fetch(url, {
        method: 'GET',
        ...args,
        headers: {
          ...this.headers,
          ...args?.headers,
        },
        credentials: 'include',
      })
    },
  }

  places = {
    /**
     * getParks
     
     * @param {RequestInit} args
    */
    getParks: (args) => {
      let url = `${this._getUrl('places')}/api/v1/parks`

      return this._fetch(url, {
        method: 'GET',
        ...args,
        headers: {
          ...this.headers,
          ...args?.headers,
        },
        credentials: 'include',
      })
    },
    /**
     * createParks
     
     * @param {RequestInit} args
    */
    createParks: (args) => {
      let url = `${this._getUrl('places')}/api/v1/parks`

      return this._fetch(url, {
        method: 'POST',
        ...args,
        headers: {
          ...this.headers,
          ...args?.headers,
        },
        credentials: 'include',
      })
    },
  }

  store = {
    /**
     * createProduct
     * @param {string} slug
     * @param {RequestInit} args
     */
    createProduct: (slug, args) => {
      let url = `${this._getUrl('store')}/api/v1/store/{slug}/product`
      url = url.replace('{slug}', slug)
      return this._fetch(url, {
        method: 'POST',
        ...args,
        headers: {
          ...this.headers,
          ...args?.headers,
        },
        credentials: 'include',
      })
    },
    /**
     * getProducts
     * @param {string} slug
     * @param {RequestInit} args
     */
    getProducts: (slug, args) => {
      let url = `${this._getUrl('store')}/api/v1/store/{slug}/products`
      url = url.replace('{slug}', slug)
      return this._fetch(url, {
        method: 'GET',
        ...args,
        headers: {
          ...this.headers,
          ...args?.headers,
        },
        credentials: 'include',
      })
    },
    /**
     * getProductCategories
     * @param {string} slug
     * @param {RequestInit} args
     */
    getProductCategories: (slug, args) => {
      let url = `${this._getUrl('store')}/api/v1/store/{slug}/products/categories`
      url = url.replace('{slug}', slug)
      return this._fetch(url, {
        method: 'GET',
        ...args,
        headers: {
          ...this.headers,
          ...args?.headers,
        },
        credentials: 'include',
      })
    },
    /**
     * getProduct
     * @param {string} productId
     * @param {RequestInit} args
     */
    getProduct: (productId, args) => {
      let url = `${this._getUrl('store')}/api/v1/product/{productId}`
      url = url.replace('{productId}', productId)
      return this._fetch(url, {
        method: 'GET',
        ...args,
        headers: {
          ...this.headers,
          ...args?.headers,
        },
        credentials: 'include',
      })
    },
    /**
     * createStore
     
     * @param {RequestInit} args
    */
    createStore: (args) => {
      let url = `${this._getUrl('store')}/api/v1/store`

      return this._fetch(url, {
        method: 'POST',
        ...args,
        headers: {
          ...this.headers,
          ...args?.headers,
        },
        credentials: 'include',
      })
    },
    /**
     * getStore
     * @param {string} slug
     * @param {RequestInit} args
     */
    getStore: (slug, args) => {
      let url = `${this._getUrl('store')}/api/v1/store/{slug}`
      url = url.replace('{slug}', slug)
      return this._fetch(url, {
        method: 'GET',
        ...args,
        headers: {
          ...this.headers,
          ...args?.headers,
        },
        credentials: 'include',
      })
    },
  }
}
