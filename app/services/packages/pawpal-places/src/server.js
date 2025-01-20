import Fastify from 'fastify';
import swaggerJsdoc from 'swagger-jsdoc';
import packageData from '../package.json' assert { type: "json" };;
import * as serviceHandlers from './routes/index.js';
import path from "path";
import FastifyOpenAPIGlue from 'fastify-openapi-glue';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { fileURLToPath } from 'url';
import rateLimit from '@fastify/rate-limit';
import { cleanEnv, str, num } from 'envalid';
import db from '../database/db.js';

// Define __filename and __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import { readdirSync } from 'fs';
const loadFiles = (dir) =>
  readdirSync(dir).map((file) => path.join(dir, file));

const routes = loadFiles(path.join(__dirname, './openapi'));

console.log('process env --->', { process: process.env })

const env = cleanEnv(process.env, {
  HOST: str({ default: '0.0.0.0' }),
  PORT: num({ default: 3000 }),
  LOG_LEVEL: str({ default: 'info' }),
  DB_HOST: str({ default: 'localhost' }),
  DB_PORT: str({ default: '5433' }),
  DB_USER: str({ default: 'postgres' }),
  DB_PASSWORD: str({ default: 'password' }),
  DB_NAME: str({ default: 'pawpal-places' }),
})

const app = Fastify({ logger: true, level: env.LOG_LEVEL, prettyPrint: true });

const configureSwaggerDoc = () => {
  const options = {
    failOnErrors: true,
    definition: {
      openapi: '3.0.0',
      info: {
        title: packageData.name,
        version: packageData.version,
        description: packageData.description
      }
    },
    apis: [...routes]
  }
  const swaggerSpec = swaggerJsdoc(options);
  return swaggerSpec;
}

const configureRoutes = () => {

  const spec = configureSwaggerDoc();

  app.register(rateLimit, {
    max: 100, // Maximum number of requests
    timeWindow: '1 minute', // Time window for the limit
  });

  console.log('JSDOCSPEC -->', { spec: JSON.stringify(spec, null, 2) })

  // Glues openapi spec with route paths and includes validation of expected inputs (requests) and expected outputs (response)
  app.register(FastifyOpenAPIGlue, {
    specification: spec,
    serviceHandlers,
    noAdditional: true,
    validateResponse: true,
    validateRequest: true,
  });

  app.get('/docs.json', async (request, reply) => {
    reply.send(spec);
  });

  app.register(swagger, {
    swagger: spec, // Use the spec here
  });

  app.register(swaggerUi, {
    routePrefix: '/docs',
  });
}

const registerShutdownHooks = () => {
  const shutdown = async (signal) => {
    app.log.info(`Received ${signal}. Closing server...`);
    await app.close();
    process.exit(0);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
};

const configureDB = () => {
  app.register(db, {
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    dbname: env.DB_NAME
  })
}

const startApp = () => {
  try {
    app.listen({ port: env.PORT, host: env.HOST })
    app.log.info(`server running at http://${env.HOST}:${env.PORT}`);
  } catch (e) {
    app.log.error({ error: e.message, stack: e.stack }, 'Error starting application');
    process.exit()
  }
};

const start = () => {
  configureRoutes()
  configureDB()
  registerShutdownHooks();
  startApp()
}

export default start;