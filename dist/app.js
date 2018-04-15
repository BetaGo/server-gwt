"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_router_1 = __importDefault(require("koa-router"));
const apollo_server_koa_1 = require("apollo-server-koa");
// Load environment variables from .env file, where API keys and passwords are configured
dotenv_1.default.config({ path: ".env" });
const graphql_1 = require("./graphql");
const app = new koa_1.default();
const router = new koa_router_1.default();
app.use(koa_bodyparser_1.default());
const mongoUrl = process.env.MONGODB_URI;
console.log(mongoUrl);
mongoose_1.default.connect(mongoUrl).then(() => { }).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
});
router.get("/graphql", apollo_server_koa_1.graphqlKoa({ schema: graphql_1.schema }));
router.post("/graphql", apollo_server_koa_1.graphqlKoa({ schema: graphql_1.schema }));
router.get("/graphiql", apollo_server_koa_1.graphiqlKoa({ endpointURL: "/graphql" }));
app.use(router.routes()).use(router.allowedMethods());
module.exports = app;
//# sourceMappingURL=app.js.map