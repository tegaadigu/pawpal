import fp from 'fastify-plugin';
import { Kafka } from 'kafkajs';

let pubSubProducer;
let pubSubConsumer;

const pubSubPlugin = fp(async (fastify, options) => {
  const {
    brokers = ['localhost:9092'],
    clientId = 'pawpal-app',
    consumerGroupId,
    consumerTopic,
    onMessage, // optional
  } = options;

  const kafka = new Kafka({ clientId, brokers });

  if (!pubSubProducer) {
    pubSubProducer = kafka.producer();
    await pubSubProducer.connect();
    fastify.log.info('Kafka Producer connected');
  }
  fastify.decorate('pubSubProducer', pubSubProducer);

  if (consumerTopic && onMessage && consumerGroupId) {
    if (!pubSubConsumer) {
      pubSubConsumer = kafka.consumer({ groupId: consumerGroupId });
      await pubSubConsumer.connect();
      await pubSubConsumer.subscribe({ topic: consumerTopic, fromBeginning: false });

      await pubSubConsumer.run({
        eachMessage: async ({ topic, message }) => {
          const data = JSON.parse(message.value.toString());
          await onMessage(data);
        },
      });

      fastify.log.info(`Kafka consumer subscribed to ${consumerTopic}`);
    }

    fastify.decorate('pubSubConsumer', pubSubConsumer);
  }

  fastify.addHook('preHandler', async (request, reply) => {
    request.pubSubProducer = pubSubProducer;
    request.pubSubConsumer = pubSubConsumer;
  });

  fastify.addHook('onClose', async () => {
    if (pubSubProducer) await pubSubProducer.disconnect();
    if (pubSubConsumer) await pubSubConsumer.disconnect();
  });
}, {
  name: 'kafka'
});

export default pubSubPlugin;
