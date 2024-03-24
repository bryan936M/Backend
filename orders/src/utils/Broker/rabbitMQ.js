import amqplib from "amqplib";
import Config from "../../config/dev.config.js";
import Logger from "../Logger/dev-logger.js";

let orderChannel = null;

// Create a channel to communicate with the broker
const amqConnect = async () => {
  try {
    const connection = await amqplib.connect(Config.BROKER_URL);
    orderChannel = await connection.createChannel();

    orderChannel.assertExchange(Config.EXCHANGE, "direct", { durable: false });

    Logger.info(`Channel successfully created to ${Config.BROKER_URL}`);

    process.once("SIGINT", async () => {
      await orderChannel.close();
      await connection.close();
    });
    process.once("uncaughtException", async () => {
      await orderChannel.close();
      await connection.close();
    });
    process.once("unhandledRejection", async () => {
      await orderChannel.close();
      await connection.close();
    });

    return orderChannel;
  } catch (error) {
    Logger.error(`Error creating channel: ${error.message}`);
    process.exit(1);
  }
};

// Publish message to the broker
const publishOrderToExchange = (channel, service, event, message) => {
  const msg = JSON.stringify({ event, data: message });

  channel.publish(Config.EXCHANGE, service, Buffer.from(msg));

  Logger.info(`Message published to, ${service}, ${msg}`);
};

// Consume message from the broker
const consumeMessage = (channel, service) => {
  const q = channel.assertQueue("", { exclusive: true }, (err, q) => {
    if (err) {
      throw new Error(err);
    }
  });

  channel.bindQueue(q.queue, Config.EXCHANGE, Config.service);

  channel.consume(
    q.queue,
    (msg) => {
      if (msg.content) {
        Logger.info(
          " [x] %s: '%s'",
          msg.fields.routingKey,
          msg.content.toString()
        );
      }
    },
    { noAck: true }
  );
};

export { publishOrderToExchange, consumeMessage };

export default amqConnect;
