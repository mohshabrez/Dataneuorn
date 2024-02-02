// Import Mongoose models for Data and Counter
import { Data }  from "../model/data.model.js";
import { Counter } from "../model/counter.model.js"

// Function to retrieve all Data items
const getAllData = async (req, res) => {
  try {
    // Find all Data items in the database
    const getDatas = await Data.find({});
    // Return a successful response with the fetched data
    return res.status(200).json(getDatas);
  } catch (error) {
    // Handle errors and return an appropriate error response
    return res.status(500).json({
      message: "Error occured while fetching the Items",
      error: error,
    });
  }
};

// Function to add a new Data item
const addData = async (req, res) => {
  try {
    // Extract data from the request body
    const data = req.body;
    // Validate the presence of data
    if (data) {
      // Create a new Data object
      const newData = new Data(data);
      // Save the new Data item to the database
      const saveData = await newData.save();

      // Increment the "add" counter
      const result = await Counter.findOneAndUpdate(
        { name: "add" },
        { $inc: { count: 1 } },
        { upsert: true },
      );
      console.log(saveData);
      // Return a successful response with the saved data
      return res.status(200).json(saveData);
    } else {
      // Return an error response if data is missing
      return res
        .status(401)
        .json({ message: "Please enter the request body data" });
    }
  } catch (error) {
    // Log and handle errors during Data addition
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error occured while adding Item", error });
  }
};

// Function to update an existing Data item
const updateData = async (req, res) => {
  // Extract data ID and body from the request
  const dataId = req.params.DataId;
  const dataBody = req.body;

  // Validate the presence of data ID and body
  if (!dataId || !Data) {
    // Return an error response if required parameters are missing
    return res
      .status(400)
      .json({ message: "Please provide the data and paramsId" });
  } else {
    try {
      // Find and update the Data item with the given ID
      const updatingData = await Data.findByIdAndUpdate(dataId, dataBody, {
        new: true,
      });
      // Increment the "update" counter
      const result = await Counter.findOneAndUpdate(
        { name: "update" },
        { $inc: { count: 1 } },
        { upsert: true },
      );

      // Return a successful response with the updated data
      return res.status(200).json({
        data: updatingData,
        message: "Successfully updated the  Data",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error occured while updating the  Data" });
    }
  }
};

// Export the defined functions for use in other parts of the application
export {
  getAllData,
  addData,
  updateData,
};
