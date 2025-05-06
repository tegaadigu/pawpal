import bcrypt from "bcrypt";

const USER_ROLE = 'user';

export class UserDao {
  constructor(_dbClient) {
    this.dbClient = _dbClient;
  }
  async getUserByPhoneNumber(phoneNumber){
    const query = {
      text: "Select id, phone_number, role from public.users where phone_number = $1",
      values: [phoneNumber]
    }
    const user = await this.dbClient.query(query);
    return user.rows?.[0];
  }

  async getUserByEmail(email){
    const query = {
      text: "Select id, phone_number, role from public.users where email = $1",
      values: [email]
    }
    const user = await this.dbClient.query(query);
    return user.rows;
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