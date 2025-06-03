export class HelperDao {
  /**
   * @param {import('pg').client} _dbClient 
   */
  constructor(_dbClient) {
    this.dbClient = _dbClient;
  }
  /**
   * Changeme | Delete me
   * @param {*} params 
   * @returns {Promise<Object>}
   */
  async getDataFromHelperDatabase(param){
    const query = {
      text: "select * from helper_table where helper_table_column = $1",
      values: [param]
    }
    const user = await this.dbClient.query(query);
    return user.rows?.[0];
  }
}

export default HelperDao;