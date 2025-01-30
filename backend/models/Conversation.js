import mongoose from "mongoose";

const conversionSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  messages: [
    {
      input: {
        type: String,
        required: true,
      },
      loggeduserid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Refers to the User model
        required: true,
      },

      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Conversation = mongoose.model("Conversation", conversionSchema);
export default Conversation;
