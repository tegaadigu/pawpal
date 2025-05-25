import Fastify from 'fastify';
import swaggerJsdoc from 'swagger-jsdoc';
import path from "path";
import FastifyOpenAPIGlue from 'fastify-openapi-glue';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import rateLimit from '@fastify/rate-limit';
import cors from '@fastify/cors';
import { cleanEnv, str, num } from 'envalid';
import { readdirSync } from 'fs';
import { readFile } from 'fs/promises';
import db from "./db.js";
import pubSubPlugin from './pub-sub-handler.js'

// Read Environment Variables
const env = cleanEnv(process.env, {
  HOST: str({ default: '0.0.0.0' }),
  PORT: num({ default: 3000 }),
  LOG_LEVEL: str({ default: 'info' }),
  DB_HOST: str({ default: 'localhost' }),
  DB_PORT: str({ default: '5433' }),
  DB_USER: str({ default: 'postgres' }),
  DB_PASSWORD: str({ default: 'password' }),
  DB_NAME: str({ default: 'pawpal-db' }),
})

const app = Fastify({ logger: true, level: env.LOG_LEVEL, prettyPrint: true });

const loadFiles = async (dir) => {
  const files = await readdirSync(dir)
  return files.map((file) => path.join(dir, file));
}

const loadJson = async (filePath) => {
  const absolutePath = path.resolve(filePath);
  const data = await readFile(absolutePath, 'utf8');
  return JSON.parse(data);
};


const configureSwaggerDoc = (routes, packageData) => {
  // import packageData from '../package.json' assert { type: "json" };;
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

const configureRoutes = async () => {
  const routes = await loadFiles(path.resolve('./src/openapi'));
  const serviceHandlers = await import(path.join(path.resolve('./src/routes/', 'index.js')));
  const packageData =  await loadJson(path.join(path.resolve('./package.json')));

  const spec = await configureSwaggerDoc(routes, packageData);

  app.register(rateLimit, {
    max: 100, // Maximum number of requests
    timeWindow: '1 minute', // Time window for the limit
  });

  console.log('JSDOCSPEC -->', { spec: JSON.stringify(spec, null, 2) })

  // Glues openapi spec with route paths and includes validation of expected inputs (requests) and expected outputs (response)
  app.register(FastifyOpenAPIGlue, {
    specification: spec,
    serviceHandlers,
    noAdditional: false,
    validateResponse: true,
    validateRequest: true,
    removeAdditional: true
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

// Derive from some env variable or secrets.
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173'
]

const registerCors = async () => {
  await app.register(cors, {
    credentials: true,
    strictPreflight: false,
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  })

  console.log('after registering cors...')
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

const configureDB = async () => {
  app.register(db, {
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    dbname: env.DB_NAME
  })
}

/**
 * 
 * @typedef {Object} PubSubOptions
 * @property {Array<string} [PubSubOptions.brokers] 
 * @property {string} [PubSubOptions.clientId]
 * @property {string} [PubSubOptions.consumerGroupId]
 * @property {string} [PubSubOptions.consumerTopic]
 * @property {function} PubSubOptions.onMessage
 */


/**
 * 
 * @param {PubSubOptions} pubSubOptions 
 */
const configurePubSub = async (pubSubOptions) => {
  app.register(pubSubPlugin, {
    brokers: pubSubOptions?.brokers || ['localhost:9092'],
    clientId: pubSubOptions?.clientId || 'pawpal-app',
    consumerGroupId: pubSubOptions?.consumerGroupId,
    consumerTopic: pubSubOptions?.consumerTopic,
    onMessage: pubSubOptions?.onMessage,
  })
}

const startApp = async () => {
  try {
    await app.listen({ port: env.PORT, host: env.HOST })
    app.log.info(`server running at http://${env.HOST}:${env.PORT}`);
  } catch (e) {
    app.log.error({ error: e.message, stack: e.stack }, 'Error starting application');
    process.exit()
  }
};

/**
 * 
 * @param {Object} options
 * @param {PubSubOptions} [options.pubSub]
 */
const start = async (options) => {
  await configureRoutes()
  await configureDB()
  await configurePubSub(options?.pubSub || {})
  registerShutdownHooks();
  await registerCors();
  await startApp()
}

export default start;

export const server = {
  start,
}