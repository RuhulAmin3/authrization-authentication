import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  client_domain: process.env.CLIENT_DOMAIN,
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    expires_default: process.env.JWT_EXPIRES_DEFAULT,
    expires_remember: process.env.JWT_EXPIRES_REMEMBER,
  },
};
