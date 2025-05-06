
const ALLOWED_SORT_FIELDS = ["price"];
const ALLOWED_SORT_ORDERS = ["asc", "desc"];

export class ProductsDao {
  tableName = 'products';
  defaultSortField = "p.id";
  defaultSortOrder = "asc";
  defaultLimit = 10;

  constructor(_dbClient) {
    this.dbClient = _dbClient;
  }

  async createProduct(params) {
    const { name, description, price, store } = params;

    const query = {
      text: `INSERT INTO ${this.tableName} (name, description, price, store_id) values($1, $2, $3, $4)`,
      values: [name, description, price, store.id]
    }

    const res = await this.dbClient.query(query);

    return res.rows[0];
  }

  async getProductsByStore(store, options = {}) {
    let { sortField = this.defaultSortField, sortOrder = this.defaultSortOrder } = options;

    if(!ALLOWED_SORT_FIELDS.includes(sortField)) {
      sortField = this.defaultSortField;
    }

    if(!ALLOWED_SORT_ORDERS.includes(sortOrder)) {
      sortOrder = this.defaultSortOrder;
    }

    const query = {
      text: `SELECT p.* , 
      COALESCE(
        jsonb_agg(DISTINCT to_jsonb(pimg)) FILTER (WHERE pimg.id IS NOT NULL), '[]'
      ) AS images,
      COALESCE(
        jsonb_agg(DISTINCT to_jsonb(pp)) FILTER (WHERE pp.id IS NOT NULL), '[]'
      ) AS prices,
      to_jsonb(c) as category, 
      COALESCE(
        jsonb_agg(DISTINCT to_jsonb(i)) FILTER (WHERE i.id IS NOT NULL), '[]'
      ) AS ingredients
      FROM ${this.tableName} p
      LEFT JOIN product_images as pimg on p.id = pimg.product_id 
      LEFT JOIN product_category as c ON p.category_id = c.id
      LEFT JOIN product_ingredients pi ON p.id = pi.product_id
      LEFT JOIN ingredients i ON pi.ingredient_id = i.id 
      LEFT JOIN product_prices pp on pp.product_id = p.id
      where p.store_id = $1`,
      values: [store.id]
    }

    if (options?.cursor) {
      query.text += ` AND p.id > $${query.values.length + 1}`,
        query.values.push(options?.cursor)
    }

    query.text += ` GROUP BY p.id, c.id ORDER BY ${sortField} ${sortOrder} LIMIT $${query.values.length + 1}`;
    query.values.push(options?.limit || this.defaultLimit)

    const result = await this.dbClient.query(query);

    console.log('product results --->', {
      result: JSON.stringify(result.rows, null, 2)
    })

    return result.rows;
  }


  async getProductCategories(store, cursor, limit = 10) {
    const query = {
      text: `SELECT c.* 
      FROM product_category c
      LEFT JOIN ${this.tableName} as p ON p.category_id = c.id
      where p.store_id = $1`,
      values: [store.id]
    }
    if (cursor) {
      query.text += ` AND p.id > $${query.values.length + 1}`,
        query.values.push(cursor)
    }
    query.text += ` GROUP BY c.id ORDER BY c.id ASC LIMIT $${query.values.length + 1}`;
    query.values.push(limit)

    const result = await this.dbClient.query(query);

    return result.rows;
  }

  async getProduct(productId) {
    const query = {
      text: `SELECT p.* , 
      COALESCE(
        jsonb_agg(DISTINCT to_jsonb(pimg)) FILTER (WHERE pimg.id IS NOT NULL), '[]'
      ) AS images,
      COALESCE(
        jsonb_agg(DISTINCT to_jsonb(pp)) FILTER (WHERE pp.id IS NOT NULL), '[]'
      ) AS prices,
      to_jsonb(c) as category, 
      COALESCE(
        jsonb_agg(DISTINCT to_jsonb(i)) FILTER (WHERE i.id IS NOT NULL), '[]'
      ) AS ingredients
      FROM ${this.tableName} p
      LEFT JOIN product_images as pimg on p.id = pimg.product_id 
      LEFT JOIN product_category as c ON p.category_id = c.id
      LEFT JOIN product_ingredients pi ON p.id = pi.product_id
      LEFT JOIN ingredients i ON pi.ingredient_id = i.id
      LEFT JOIN product_prices pp on pp.product_id = p.id 
      where p.id = $1 GROUP BY p.id, c.id`,
      values: [productId]
    }
    const result = await this.dbClient.query(query);

    console.log('\n\n\n\n\nresults ----->', { results: result.rows[0] })
    return result.rows[0]
  }
}

export default ProductsDao;