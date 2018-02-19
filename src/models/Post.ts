import * as mongoose from "mongoose";

export type PostModel = mongoose.Document & {
    title: string,
    content: string,
};

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
});

const Post = mongoose.model("Post", postSchema);
export default Post;
