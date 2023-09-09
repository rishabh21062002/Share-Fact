import mongoose, { mongo } from "mongoose";

const factSchema = mongoose.Schema(
  {
    factText: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    numOfLikes: {
      type: Array,
      default: [0, 0, 0],
    },
    disputed: {
      type: Boolean,
      default: false,
    },
  },
  { timespans: true }
);

const Fact = mongoose.model("Facts", factSchema);

export default Fact;
