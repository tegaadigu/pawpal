import fp from 'fastify-plugin';
import pg from 'pg';

const db = async (fastify, options) => {
  const { 
    host,
    user, 
    max = 20, 
    idleTimeoutMillis = 30000,
    connectionTimeoutMillis = 2000,
    acquireTimeoutMillis = 5000,
    port,
    dbname,
    password
  } = options;

  const { Pool } = pg;
  const pool = new Pool({
    host,
    port,
    user,
    password,
    database: dbname,
    max,
    idleTimeoutMillis,
    connectionTimeoutMillis,
    acquireTimeoutMillis
  });

  if(!fastify.db) {
    fastify.addHook('onClose', (instance, done) => {
      pool.end().then(done).catch(done);
    });
  
    fastify.decorate('db', pool)
    fastify.addHook('preHandler', async (request, reply) => {
      request.db = fastify.db;
    })
  }
}

export default fp(db);