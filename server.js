const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const userRoutes = require("./routes/user.routes");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const app = express();
app.use(express.json());
app.use("/api/v1/users", userRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed");
        console.log(error.message);
    });