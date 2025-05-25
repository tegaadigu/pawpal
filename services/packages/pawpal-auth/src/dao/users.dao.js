import bcrypt from "bcrypt";

const USER_ROLE = 'user';

export class UserDao {
  constructor(_dbClient) {
    this.dbClient = _dbClient;
  }
  async getUserByPhoneNumber(phoneNumber){
    const query = {
      text: "Select u.id, u.phone_number, u.role, to_jsonb(a) as account from public.users as u LEFT JOIN user_account as a ON a.user_id = u.id where phone_number = $1",
      values: [phoneNumber]
    }
    const user = await this.dbClient.query(query);
    return user.rows?.[0];
  }

  /**
   * @param {string} email 
   * @returns 
   */
  async getUserByEmail(email){
    const query = {
      text: "Select u.id, u.phone_number, u.role, to_jsonb(a) as account from public.users as u LEFT JOIN user_account as a ON a.user_id = u.id where email = $1",
      values: [email]
    }
    const user = await this.dbClient.query(query);
    return user?.rows?.[0];
  }
  async save(params) {
    const user = {
      email: '',
      phone_number: '',
      is_active: true,
      role: USER_ROLE,
      ...params,
      password: params?.password ? await bcrypt.hash(params?.password, 10) : ''
    }
    const query = {
      text: "INSERT INTO public.users (email, password, phone_number, is_active, role) values($1, $2, $3, $4, $5)",
      values: [user.email, user.password, user.phone_number, user.is_active, user.role]
    }

    await this.dbClient.query(query);
    return { ...user, password: '' };
  }

}

export default UserDao;