import fp from 'fastify-plugin';
import pg from 'pg';

let pool;

const getDbInstance = (options) => {
  const { Pool } = pg;
  if (!pool) {
    const {
      host,
      user,
      max = 10,
      idleTimeoutMillis = 30000,
      connectionTimeoutMillis = 2000,
      port,
      dbname,
      password
    } = options;
    try {
      pool = new Pool({
        host,
        port,
        user,
        password,
        database: dbname,
        max,
        idleTimeoutMillis,
        connectionTimeoutMillis
      });

      pool.on('error', (e) => {
        console.log('unexpected database pool error', e);
        pool = null;
      })
    } catch (e) {
      console.log('Failed to create DB pool..')
    }
  }
  return pool;
};

const db = async (fastify, options) => {
  const connection = getDbInstance(options)
  fastify.addHook('onClose', (instance, done) => {
    connection.end().then(done).catch(done);
  });
  fastify.decorate('db', connection)
  fastify.addHook('preHandler', async (request, reply) => {
    request.db = fastify.db;
    request.pgClient = await fastify.db.connect();
    reply.raw.on('finish', async () => {
      if (request.pgClient) {
        request.pgClient.release();
        request.pgClient = null;
      }
    })
  })
}

export default fp(db);