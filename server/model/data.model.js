import mongoose from "mongoose";

// Defining a schema for the data
const dataSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    component: {
      type: String,
    },
  },
  { timestamps: true },
);

// Creating a model for the data
const Data = mongoose.model("Data", dataSchema);

export { Data };
