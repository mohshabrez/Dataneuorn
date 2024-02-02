// Import the Mongoose library
import mongoose from "mongoose";

// Define a Mongoose schema for Counter documents
const counterSchema = new mongoose.Schema({
  // Name of the counter (required)
  name: { type: String, required: true },
  // Count value (default to 0)
  count: { type: Number, default: 0 },
});

// Create a Mongoose model for Counters
const Counter = mongoose.model("Counter", counterSchema);

// Export the Counter model for use in other parts of the application
export { Counter };
