import amqplib from "amqplib";
import Config from "../../config/dev.config.js";
import Logger from "../Logger/dev-logger.js";

let productChannel = null;

const amqConnect = async () => {
  try {
    const connection = await amqplib.connect(Config.BROKER_URL);
    productChannel = await connection.createChannel();

    // Handle shutdown events
    process.once("SIGINT", async () => {
      await productChannel.close();
      await connection.close();
    });
    process.on("uncaughtException", async (err) => {
      console.error("Unhandled Exception:", err);
      await productChannel.close();
      await connection.close();
      process.exit(1);
    });
    process.on("unhandledRejection", async (reason, promise) => {
      console.error("Unhandled Rejection at:", promise, "reason:", reason);
      await productChannel.close();
      await connection.close();
      process.exit(1);
    });

    await productChannel.assertQueue(Config.EXCHANGE, "direct", {
      durable: true,
    });

    Logger.info(`Channel successfully created to ${Config.BROKER_URL}`);

    return productChannel;
  } catch (error) {
    Logger.error(`Error creating channel:${error}`);
    process.exit(1);
  }
};

// Publish message to the broker
const publishOrderToExchange = (channel, service, event, message) => {
  if (typeof message !== "string") {
    message = JSON.stringify({ event, message });
  }

  channel.publish(Config.EXCHANGE, service, Buffer.from(message));

  Logger.info(`Message published to ${service} ${{ event, message }}`);
};

// Consume message from the broker
const consumeMessage = async (channel, service) => {
  if (channel == null) {
    Logger.error(new Error("Channel not found").message);
    process.exit(1);
  }
  
  await channel.assertExchange(Config.EXCHANGE, "direct", { durable: false });

  const q = await channel.assertQueue("", { exclusive: true });

  channel.bindQueue(q.queue, Config.EXCHANGE, Config.service);

  Logger.info(`Waiting for messages in queue: ${q.queue}`);

  channel.consume(
    q.queue,
    (msg) => {
      service.subscribeToProductEvents(msg.content.toString());
    },
    { noAck: true }
  );
};

export { publishOrderToExchange, consumeMessage };

export default amqConnect;
