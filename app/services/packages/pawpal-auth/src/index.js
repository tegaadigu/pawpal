// import app from './server.js';

// app();

import { server } from "@pawpal-service/shared";

(async () => {
  try {
    console.log('server server -->', { server })
    await server.start();
  }catch(e) {
    console.log("Server Encountered an error -->", e);
  }
})();
