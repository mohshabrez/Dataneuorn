// Import necessary modules
import express from ("express");
import { Counter } from ("../model/counter.model.js");

// Create an Express router
const router = express.Router();

// Import data controller functions
import {
  getAllData,
  addData,
  updateData,
} from "../controllers/data.controller.js";

// Define routes for data operations
router
  .route("/")
  .get(getAllData) // Retrieve all Data items
  .post(addData); // Add a new Data item

// Route to update an existing Data item
router.post("/:DataId", updateData);

// Route to fetch counters
router.get("/counters", async (req, res) => {
  try {
    // Retrieve all counters from the database
    const counters = await Counter.find();
    // Return the counters as a JSON response
    return res.json(counters);
  } catch (error) {
    // Handle errors during counter retrieval
    return res.status(500).json({ message: "Error fetching counters" });
  }
});

// Export the router for use in the Express application
export default router;
