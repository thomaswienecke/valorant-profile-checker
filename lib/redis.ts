import { createClient } from "redis";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const client = createClient(publicRuntimeConfig.REDIS_URL);
client.on("error", (err) => console.log("Redis Client Error", err));

const getRedisClient = async () => {
  if (!client.isOpen) {
    client.connect();
  }

  return client;
};

export { getRedisClient };
