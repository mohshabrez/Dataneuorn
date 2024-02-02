import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import axios from "axios";
import "./App.css";

// Wrap Responsive with WidthProvider to provide width for layout
const ResponsiveGridLayout = WidthProvider(Responsive);

const App = () => {
  // API endpoint for data interactions
  const api = "https://dataneuorn.onrender.com/api/v1";
  // State variables for layout, data, buttons, counters, and loading
  const [layout, setLayout] = useState([
    { i: "0", x: 0, y: 0, w: 3, h: 2, static: false },
    { i: "1", x: 1, y: 0, w: 3, h: 2, static: false },
    { i: "2", x: 4, y: 0, w: 3, h: 2, static: false },
  ]);
  const [addbutton, setAddButton] = useState(false);
  const [data, setData] = useState({
    0: {
      id: "",
      title: "",
      description: "",
      component: "",
      addCounter: "",
      updateCounter: "",
    },
    1: {
      id: "",
      title: "",
      description: "",
      component: "",
      addCounter: "",
      updateCounter: "",
    },
    2: {
      id: "",
      title: "",
      description: "",
      component: "",
      addCounter: "",
      updateCounter: "",
    },
  });

  const [loading, setLoading] = useState(true);
  const [addCounter, setAddCounter] = useState(0);
  const [updateCounter, setUpdateCounter] = useState(0);

  // Fetch counters on component mount
  useEffect(() => {
    const fetchCounters = async () => {
      // Fetch counters from API and update state 
      //API call execution time: 0.3999999910593033 ms
      const response = await fetch(`${api}/counters`);
      const data = await response.json();
      setAddCounter(data.find((c) => c.name === "add").count);
      setUpdateCounter(data.find((c) => c.name === "update").count);
    };

    fetchCounters();
  }, []);

  // Fetch initial data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from API and update state
        //API call execution time: 0.6000000089406967 ms
        const response = await axios.get(api);
        const Gotdata = response.data.reduce((acc, item, index) => {
          acc[index] = {
            id: item._id,
            title: item.title,
            description: item.description,
            component: item.component,
          };
          return acc;
        }, {});
        setData(Gotdata);
        setLoading(false);
      } catch (error) {
        // Handle errors
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // Handle input changes for title and description
  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: { ...prevData[id], [name]: value },
    }));
  };

  // Clear object data for a specific index
  const clearObject = (index) => {
    setData((prevData) => {
      const newData = { ...prevData };
      newData[index] = {
        id: parseInt(index),
        title: "",
        description: "",
        component: "",
        addCounter: "",
        updateCounter: "",
      };
      setAddButton(true);
      // console.log(newData);
      return newData;
    });
  };

  const handleAdd = async (e, id) => {
    try {
      if (data[e].title === "" || data[e].description === "") {
        setAddButton(false);
      } else {
        const componentValue = { ...data[e], component: e };
        // console.log(componentValue);
        // Send POST request to API to add item
        //API call execution time: 0.20000000298023224 ms
        const response = await axios.post(`${api}`, componentValue);
        console.log(response.data);
        setAddButton(false);
      }
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };
  const handleUpdate = async (id) => {
    try {
      //API call execution time: 0.3000000029802322 ms
      const response = await axios.post(`${api}/${data[id].id}`, data[id]);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Render loading message if loading is true
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render the main layout and counters
  return (
    <div className="flexing">
      <h3>
        Note: The Buttons Inside the Responsive layout needs small left drag and
        2 or 3 clicks to work bcz of bugs in packages babel
      </h3>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
        width={2800}
        margin={[10, 10]}
        isResizable={true}
      >
        {layout?.map((item, index) => (
          <div key={item?.i} className="layout">
            <input
              type="text"
              name="title"
              value={data[index]?.title}
              onChange={(e) => handleChange(e, item?.i)}
              placeholder="Title"
            />
            <textarea
              name="description"
              value={data[index]?.description}
              onChange={(e) => handleChange(e, item?.i)}
              placeholder="Description"
            />
            <button
              onClick={() =>
                !addbutton ? clearObject(item?.i) : handleAdd(item?.i)
              }
            >
              Add
            </button>
            <button onClick={() => handleUpdate(item?.i)}>Update</button>
          </div>
        ))}
      </ResponsiveGridLayout>
      <div className="counter-container">
        <div>
          <h2>ADD COUNT:</h2>
          <h1>{addCounter}</h1>
        </div>
        <div>
          <h2>Update COUNT:</h2>
          <h1>{updateCounter}</h1>
        </div>
      </div>
    </div>
  );
};

export default App;
