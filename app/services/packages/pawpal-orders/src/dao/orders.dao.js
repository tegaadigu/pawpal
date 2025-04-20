export class OrdersDao {
  tableName = 'orders';
  defaultSortField = "p.id";
  defaultSortOrder = "asc";
  defaultLimit = 10;

  constructor(_dbClient) {
    this.dbClient = _dbClient;
  }
  
  async createOrder(user, store, params ) {
    const { currency, total_amount } = params;
    const query = {
      text: `INSERT INTO ${this.tableName} (user_id, store_id, total_amount, currency) values($1, $2, $3, $4) returning *`,
      values: [user.id, store.id, total_amount, currency]
    }
    const res = await this.dbClient.query(query);
    return res.rows[0];
  }
}