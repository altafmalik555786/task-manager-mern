const mongoose = require("mongoose");
const cloudinary = require('cloudinary').v2;
const mongoString = process.env.DATABASE_URL;
const eventListnerFunction = require("./utils/helper/emitters/event-listner");
const { createSuperAdmin } = require("./api/users/super-admin");

const config = () => {

    // MongoDB Connection
    mongoose.connect(mongoString);
    const database = mongoose.connection;
    database.on("error", (error) => {
        console.log(error);
    });

    database.once("connected", async() => {
        // to create super-admin
        await createSuperAdmin()
        console.log("Database Connected")
    });

    // Cloudinary Files
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Handling the unhandledRejection
    process.on("unhandledRejection", (err) => {
        console.error("Unhandled Promise Rejection:", err);
    });

    // Handling the uncaughtException
    process.on("uncaughtException", (err) => {
        console.error("Uncaught Exception:", err);
    });


    // This file has been imported to listen the events
    eventListnerFunction()

}

module.exports = config