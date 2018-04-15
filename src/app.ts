import Koa from "koa";
import dotenv from "dotenv";
import mongoose from "mongoose";
import koaBody from "koa-bodyparser";
import KoaRouter from "koa-router";
import { graphqlKoa, graphiqlKoa } from "apollo-server-koa";
import { makeExecutableSchema } from "graphql-tools";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env" });

import { schema } from "./graphql";
const app = new Koa();
const router = new KoaRouter();
app.use(koaBody());

const mongoUrl = process.env.MONGODB_URI;
console.log(mongoUrl);
mongoose.connect(mongoUrl).then(
    () => {}
).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
});

router.get("/graphql", graphqlKoa({schema: schema}));
router.post("/graphql", graphqlKoa({schema: schema}));
router.get("/graphiql", graphiqlKoa({ endpointURL: "/graphql" }));
app.use(router.routes()).use(router.allowedMethods());

module.exports = app;