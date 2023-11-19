import {
  ConfigModule,
  ConfigModuleOptions,
  ConfigService,
} from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { config as ormconfig } from '../ormconfig';

// Defines all the environment variables
const environment = () => ({
  env: process.env.NODE_ENV,
  database_logging: process.env.DATABASE_LOGGING,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiration: process.env.JWT_TOKEN_EXPIRATION,
  },
  mailer: {
    port: parseInt(process.env.MAILER_PORT, 10),
    host: process.env.MAILER_HOST,
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
  aws: {},
});

// Validation for all the environment variables
const validation = {
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  POSTGRES_PORT: Joi.string().default(5432),
  POSTGRES_HOST: Joi.string().default('localhost'),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  DATABASE_LOGGING: Joi.boolean().default('false'),
  JWT_SECRET: Joi.string().required(),
  JWT_TOKEN_EXPIRATION: Joi.string().default('10m'),
  MAILER_PORT: Joi.string().required(),
  MAILER_HOST: Joi.string().required(),
  MAILER_USER: Joi.string().required(),
  MAILER_PASS: Joi.string().required(),
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  AWS_ACCOUNT_ID: Joi.string().required(),
  AWS_REGION: Joi.string().default('us-east-1'),
};

// Options for ConfigModule
export const ConfigOptions: ConfigModuleOptions = {
  isGlobal: true,
  load: [environment],
  validationSchema: Joi.object(validation),
};

// Options for TypeORM
export const TypeOrmOptions: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    const database_logging = config.get('database_logging') === 'true';

    return {
      type: 'postgres',
      ...ormconfig,
      logging: database_logging && config.get('NODE_ENV') === 'development',
    };
  },
};

// // Options for JWT
// export const JwtOptions: JwtModuleAsyncOptions = {
//   imports: [ConfigModule],
//   inject: [ConfigService],
//   useFactory: (config: ConfigService) => {
//     const { secret, expiration: expiresIn } = config.get('jwt');
//     return { secret, signOptions: { expiresIn } };
//   },
// };

// // Options for Mailer
// export const MailerOptions: MailerAsyncOptions = {
//   imports: [ConfigModule],
//   inject: [ConfigService],
//   useFactory: (config: ConfigService) => {
//     const { host, port, user, pass } = config.get<IMailerConfig>('mailer');

//     return {
//       transport: { host, port, auth: { user, pass } },
//       defaults: {
//         from: '"Openbox Cloud" <noreply@openbox.cloud>',
//       },
//       template: {
//         dir: join(__dirname, '..', 'src', 'tools', '_templates'),
//         adapter: new HandlebarsAdapter(),
//         options: {
//           strict: true,
//         },
//       },
//     };
//   },
// };
