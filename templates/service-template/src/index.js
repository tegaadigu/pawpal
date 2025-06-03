import { server } from "@pawpal-service/shared";

(async () => {
  try {
    await server.start();
  }catch(e) {
    console.log("Server Encountered an error -->", e);
  }
})();
