import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
}));
