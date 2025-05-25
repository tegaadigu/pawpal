import { server, PUB_SUB_TOPICS } from "@pawpal-service/shared";

(async () => {
  try {
    await server.start({
      pubSub: {
        clientId: 'pawpal-otp',
        brokers: ['redpanda:9092'],
        consumerGroupId: 'pawpal-otp-consumer-group',
        consumerTopic: PUB_SUB_TOPICS.OTP_EVENTS.topic,
        onMessage: async(data) => {
          console.log('message happening....', data);
        }
      }
    });
  }catch(e) {
    console.log("Server Encountered an error -->", e);
  }
})();
