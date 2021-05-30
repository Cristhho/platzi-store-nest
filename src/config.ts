import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATA_BASE_NAME,
      host: process.env.DATA_BASE_HOST,
      user: process.env.DATA_BASE_USER,
      password: process.env.DATA_BASE_PASSWORD,
    },
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
  };
});
