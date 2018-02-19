"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
});
const Post = mongoose.model("Post", postSchema);
exports.default = Post;
//# sourceMappingURL=Post.js.map