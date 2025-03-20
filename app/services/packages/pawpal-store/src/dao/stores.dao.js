export class StoresDao {
  tableName = 'stores';

  constructor(_dbClient) {
    this.dbClient = _dbClient;
  }

  async generateSlug(name) {
    return name?.toLowerCase().trim().replace(/\s+/g, '-');
  }

  async createStore(params) {
    const { name, description, phone_number, slug, is_active, owner_id } = params;
    console.log('\n\n\n params --->', params);
    const query = {
      text: `INSERT INTO ${this.tableName} (name, slug, description, phone_number, is_active, owner_id) values($1, $2, $3, $4, $5, $6)`,
      values: [name, slug, description, phone_number, is_active, owner_id]
    }


    const res = await this.dbClient.query(query);

    console.log('\n\n\nquery to insert --->', {query, res })

    return res.rows[0];
  }

  async getStoreBySlug(slug) {
    const query = {
      text: `SELECT * from ${this.tableName} where slug = $1`,
      values: [slug]
    }
    const res = await this.dbClient.query(query);

    console.log('\n\n\nquery to select --->', {query, res })
    return res.rows[0];
  }
}

export default StoresDao;