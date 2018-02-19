"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const koaBody = require("koa-body");
const Post_1 = require("../models/Post");
const router = new Router({ prefix: "/post" });
router
    .get("/", (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    ctx.body = "主页";
}))
    .post("/", koaBody(), (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    // console.log(ctx.request.body);
    // ctx.body = JSON.stringify(ctx.request.body);
    const post = new Post_1.default({
        title: ctx.request.body.title,
        content: ctx.request.body.content,
    });
    yield post
        .save()
        .then(err => {
        if (err) {
            console.log(err);
        }
        ctx.body = "success";
    });
}))
    .put("/", (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    ctx.body = "Put";
}))
    .del("/", (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    ctx.body = "Delete";
}));
exports.default = router;
//# sourceMappingURL=post.js.map