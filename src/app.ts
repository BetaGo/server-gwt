import * as Koa from "koa";
import * as dotenv from "dotenv";
import * as mongoose from "mongoose";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env" });

import postController from "./controllers/post";

const app = new Koa();

const mongoUrl = process.env.MONGODB_URI;
console.log(mongoUrl);
mongoose.connect(mongoUrl).then(
    () => {}
).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
});


app.use(postController.routes()).use(postController.allowedMethods());


module.exports = app;