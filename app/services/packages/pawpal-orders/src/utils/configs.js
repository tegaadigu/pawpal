import { cleanEnv, str, num } from 'envalid';

// Read Environment Variables
const config = cleanEnv(process.env, {
  AUTH_ENDPOINT: str({ default: "http://127.0.0.1:3001" }),
  STORE_ENDPOINT: str({ default: "http://127.0.0.1:3002" })
})

export default config;