import { natsWrapper } from "./nats-wrapper";
import { OrderCreatedListener } from "./events/listener/order-created-listener";

const start = async () => {
 
  if (
    !process.env.NATS_CLUSTER_ID ||
    !process.env.NATS_CLIENT_ID ||
    !process.env.NATS_URL
  ) {
    throw new Error(
      "NATS_CLUSTER_ID, NATS_CLIENT_ID, NATS_URL  must be defined",
    );
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL,
    );
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed");
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());   

    new OrderCreatedListener(natsWrapper.client).listen()
   
  } catch (error: any) {
    console.error(`Error on connection ${error.message}`);
  }
 console.log('Expiration service up and running')
};

start();
