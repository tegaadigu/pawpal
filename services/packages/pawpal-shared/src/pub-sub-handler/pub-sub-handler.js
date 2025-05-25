import fp from 'fastify-plugin';
import { Kafka } from 'kafkajs';

let pubSubProducer;
let pubSubConsumer;

const pubSubPlugin = fp(async (fastify, options) => {
  const {
    brokers = ['redpanda:9092'],
    clientId = 'pawpal-app',
    consumerGroupId,
    consumerTopic,
    onMessage, // optional
  } = options;


  const kafka = new Kafka({ clientId, brokers });
  try {
    if (!pubSubProducer) {
      pubSubProducer = kafka.producer();
      await pubSubProducer.connect();
      fastify.log.info(`Kafka Producer connected ${JSON.stringify({ clientId, brokers })}`);
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
      if (pubSubProducer) {
        console.log('pubSUbProducer in preHandler --->', pubSubProducer)
        request.pubSubProducer = pubSubProducer;
      }
      if (pubSubConsumer) {
        console.log('pubSubConsumer in preHandler --->', pubSubConsumer)
        request.pubSubConsumer = pubSubConsumer;
      }
    });

    fastify.addHook('onClose', async () => {
      if (pubSubProducer) await pubSubProducer.disconnect();
      if (pubSubConsumer) await pubSubConsumer.disconnect();
    });
  } catch (e) {
    fastify.log.info('failed to connect Kafka Producer', err)
    throw e
  } 
}, {
  name: 'kafka'
});

export default pubSubPlugin;


