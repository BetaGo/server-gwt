import * as Router from "koa-router";
import * as koaBody from "koa-body";

import { default as Post, PostModel } from "../models/Post";

const router = new Router({prefix: "/post"});

router
    .get("/", async (ctx, next) => {
        ctx.body = "主页";
    })
    .post("/",
        koaBody(),
        async (ctx, next) => {
            // console.log(ctx.request.body);
            // ctx.body = JSON.stringify(ctx.request.body);
            const post = new Post({
                title: ctx.request.body.title,
                content: ctx.request.body.content,
            });
            await post
                .save()
                .then(err => {
                    if (err) {console.log(err); }
                    ctx.body = "success";
                });
        },
    )
    .put("/", async (ctx, next) => {
        ctx.body = "Put";
    })
    .del("/", async (ctx, next) => {
        ctx.body = "Delete";
    });

export default router;
