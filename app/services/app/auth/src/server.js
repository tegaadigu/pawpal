import Fastify from 'fastify';
import swaggerJsdoc from 'swagger-jsdoc';
import packageData from '../package.json' assert { type: "json" };;
import * as routes from './routes/index.js';
import path from "path";
import FastifyOpenAPIGlue from 'fastify-openapi-glue';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { fileURLToPath } from 'url';

// Define __filename and __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = Fastify({ logger: true });

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
    apis: [path.join(__dirname, './routes/*.js')]
  }
  const swaggerSpec = swaggerJsdoc(options);
  return swaggerSpec;
}

const configureRoutes = () => {

  const spec = configureSwaggerDoc();
  app.register(FastifyOpenAPIGlue, {
    specification: spec,
    service: routes,
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

const startApp = () => {
  const port = process.env.PORT || 3000;
  app.listen({ port })
};

const start = () => {
  configureRoutes()
  startApp()
}

export default start;