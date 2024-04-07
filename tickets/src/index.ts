import mongoose from "mongoose";
import { natsWrapper } from "./nats-wrapper";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
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
    // Connect to NATS
    //clusterId --> ticketing we initialize this id on infra/k8s/nats-depl.yaml
    //clientId --> asdasd
    //url --> http://nats-srv:4222
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

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error: any) {
    console.error(`Error on connection ${error.message}`);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000  From tickets");
  });
};

start();
