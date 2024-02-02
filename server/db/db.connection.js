// Import the Mongoose library for database interaction
import mongoose from "mongoose";

// Function to initialize the database connection
const initializeDatabase = async () => {
  try {
    // Attempt to connect to the MongoDB database
    const connectedDb = await mongoose.connect(process.env.MONGODB, {
      // Options for connection configuration
      useNewUrlParser: true, // Use the new URL parser for MongoDB connections
      useUnifiedTopology: true, // Use the unified topology for MongoDB connections
      dbName: "Data-Neuron", // Specify the database name to connect to
    });

    // Check if the connection was successful
    if (connectedDb) {
      console.log("DB Connected"); // Log a success message
    } else {
      console.log("Error occured while connecting db"); // Log an error message
    }
  } catch (error) {
    // Handle errors during connection initialization
    throw new Error("Error occured while initializing connection");
  }
};

// Export the initializeDatabase function for use in other parts of the application
export { initializeDatabase };
