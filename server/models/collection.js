import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const collectionSchema = new Schema(
  {
    blogs: [
      {
        type: ObjectId,
        ref: "Blog",
      },
    ],
    user: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Collection", collectionSchema);