import { server } from "@pawpal-service/shared";

(async () => {
  try {
    await server.start({
      pubSub: {
        clientId: 'pawpal-auth',
        brokers: ['redpanda:9092']
      }
    });
  }catch(e) {
    console.log("Server Encountered an error -->", e);
  }
})();
