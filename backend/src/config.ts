import { MainConfig } from '@/_boot';
import { environment, EnvironmentConfig, envNumber, envString } from '@/_lib/Environment';

type Configuration = MainConfig & EnvironmentConfig;

const config: Configuration = {
  appName: 'node-api-boilerplate',
  cli: process.argv.includes('--cli'),
  environment: environment(),
  repl: {
    port: envNumber('REPL_PORT', 2580),
  },
  http: {
    host: envString('HOST', 'localhost'),
    port: envNumber('PORT', 3001),
    cors: true,
  },
  swagger: {
    title: 'ToDo API',
    version: '1.0.0',
    basePath: '/api',
    docEndpoint: '/api-docs',
  },
  mongodb: {
    database: envString('DB_NAME', 'todo'),
    host: envString('DB_HOST', 'mongodb://localhost:27017'),
    username: envString('DB_USER', 'todo'),
    password: envString('DB_PASS', 'todo'),
  },
};

export { config };
export type { Configuration };
