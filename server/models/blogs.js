import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 160,
    },
    slug: {
        type: String,
        lowercase: true,
    },
    content: {
        type: String,
        required: true,
        maxlength: 2000,
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required: true,
    },
    country: {
        type: String,
        trim: true,
        required: true,
    },
    city: {
        type: String,
        trim: true,
        required: true,
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
    user: {
        type: ObjectId,
        ref: "User",
        required: true,
    }, 
    collect: {
        type: Number,
        default: 0,
    }, 
    like: {
        type: Number,
        default: 0
    },
    price : {
        type: Number,
        trim: true,
        required: true,
    }
},
    { timestamps: true },
);


export default mongoose.model("Blog", blogSchema);