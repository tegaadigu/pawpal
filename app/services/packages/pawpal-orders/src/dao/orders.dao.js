export class OrdersDao {
  tableName = 'orders';
  orderProductTableName = 'order_products';
  defaultSortField = "p.id";
  defaultSortOrder = "asc";
  defaultLimit = 10;

  constructor(_dbClient) {
    this.dbClient = _dbClient;
  }
  /**
   * @param {Object} user
   * @param {string} [user.id] 
   * @param {Object} store
   * @param {string} store.id 
   * @param {Object} params
   * @param {string} params.currency
   * @param {number} param.total_amount 
   * @returns 
   */
  async createOrder(user, store, params ) {
    const { currency, total_amount } = params;
    const query = {
      text: `INSERT INTO ${this.tableName} (user_id, store_id, total_amount, currency) values($1, $2, $3, $4) returning *`,
      values: [user ? user?.id : null, store.id, total_amount, currency]
    }
    const res = await this.dbClient.query(query);
    return res.rows[0];
  }

  /**
   * 
   * @param {object} order 
   * @param {string} order.id
   * @param {string} store.id
   * @param {*} params 
   */
  async createOrderProduct(order, params) {
    const { products } = params
    const values = []
    const columns = ['order_id', 'product_id', 'price_id', 'amount', 'quantity']
    const valuesPlaceholder = products?.map((product, i) => {
      const idx = i * columns.length
      values.push(order.id, product.product_id, product.price_id, product.amount, product.quantity )
      const placeholders = columns.map((_, j) => `$${idx + j + 1}`)
      return `(${placeholders.join(',')})`
    }).join(',')
    const query = {
      text: `INSERT INTO ${this.orderProductTableName} (${columns.join(',')}) values ${valuesPlaceholder} returning *`,
      values
    }

    const res = await this.dbClient.query(query);
    const createdOrder = {
      ...order,
      products: res.rows
    }
    return createdOrder
  }
}