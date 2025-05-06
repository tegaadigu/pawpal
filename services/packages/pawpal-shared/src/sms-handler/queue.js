import amqp from 'amqplib';
import AWS from 'aws-sdk';

export const QUEUE_TYPES = {
  SQS: 'SQS',
  RABBITMQ: 'RabbitMQ',
};

class RabbitMQManager {
  async connect(queueName, url) {
    try {
      const connection = await amqp.connect(url);
      const channel = await connection.createChannel();
      await channel.assertQueue(queueName, { durable: true });
      return channel;
    } catch (error) {
      throw new Error(`Failed to connect to RabbitMQ: ${error.message}`);
    }
  }

  async sendMessage(channel, queueName, messageBody) {
    try {
      channel.sendToQueue(queueName, Buffer.from(messageBody));
    } catch (error) {
      throw new Error(`Failed to send message to RabbitMQ: ${error.message}`);
    }
  }
}

class SQSManager {
  constructor(region, accessKeyId, secretAccessKey) {
    AWS.config.update({ region, accessKeyId, secretAccessKey });
    this.sqs = new AWS.SQS();
  }

  async sendMessage(queueUrl, messageBody) {
    try {
      await this.sqs
        .sendMessage({
          QueueUrl: queueUrl,
          MessageBody: messageBody,
        })
        .promise();
    } catch (error) {
      throw new Error(`Failed to send message to SQS: ${error.message}`);
    }
  }
}

// Factory to manage queues
  export const createQueue = async (queueType, config) => {
    switch (queueType) {
      case QUEUE_TYPES.RABBITMQ:
        const rabbitManager = new RabbitMQManager();
        return await rabbitManager.connect(config.queueName, config.url);
      case QUEUE_TYPES.SQS:
        const sqsManager = new SQSManager(
          config.region,
          config.accessKeyId,
          config.secretAccessKey
        );
        return sqsManager;
      default:
        throw new Error('Unsupported queue type');
    }
  }
