
import { config } from "./config.js";

import { createClient } from "redis";

const client = createClient({
  url: config.redis_url,
});

export default async function redisClient() {
  client.on("error", (err) => console.log(err));

  await client.connect();

  console.log("✅ Redis Connected");

  return client;
}