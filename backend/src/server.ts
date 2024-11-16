import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import connectDB from "./config/mongoConfig";
import redisClient from "./config/redisConfig";

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/ludo";

// Start Server
(async () => {
    try {
        // Connect to MongoDB
        await connectDB(MONGO_URI);

        // Connect to Redis
        await redisClient.connect();

        // Start Express server
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("Error starting server:", err);
        process.exit(1);
    }
})();
