import { createClient } from "redis";

const redisClient = createClient({
    url: `redis://${process.env.REDIS_HOST || "localhost"}:6379`,
});

redisClient.on("connect", () => console.log("Redis connected successfully."));
redisClient.on("error", (err) => console.error("Redis connection error:", err));

export default redisClient;
