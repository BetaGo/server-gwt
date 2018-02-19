"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env" });
const post_1 = require("./controllers/post");
const app = new Koa();
const mongoUrl = process.env.MONGODB_URI;
console.log(mongoUrl);
mongoose.connect(mongoUrl).then(() => { }).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
});
app.use(post_1.default.routes()).use(post_1.default.allowedMethods());
module.exports = app;
//# sourceMappingURL=app.js.map