
import { createQueue  } from "./queue.js";

export const smsHandler = (url, queueType) => {
  const queue = createQueue(url, queueType);
  const sendSMS = (phoneNumber, message) => {
    queue.sendMessage({
      phoneNumber,
      message
    })
  }
  return {
    sendSMS
  }
}