require('dotenv').config(); // Add this line at the top
const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const axios = require("axios"); // Import axios
const app = express();
const path = require("path");

let apiKey=process.env.GEMINI_API_KEY;
 
let port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req,res) => {
  res.render("index.ejs");
});

app.get("/index.ejs", (req, res) => {
  res.render("index.ejs");
});

app.get("/get-diagnosed-2.ejs", (req, res) => {
  res.render("get-diagnosed-2.ejs");
});

app.get("/index.ejs", (req, res) => {
  res.render("index.ejs");
});

app.get("/about-us.ejs", (req, res) => {
  res.render("about-us.ejs");
});

app.get("/learn-how.ejs", (req, res) => {
  res.render("learn-how.ejs");
});

app.get("/get-help.ejs", (req, res) => {
  res.render("get-help.ejs");
});

app.post("/get-assessment", async (req, res) => {
  const { symptoms } = req.body;
  // const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`;
  // if (!symptoms) {
  //   return res.status(400).json({ error: "Symptoms are required" });
  // }

  // try {
  //   // Send request to Gemini API (replace with actual API details)
  //   const response = await axios.post(
  //     "GEMINI_API_URL",
  //     { symptoms },
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`
  //       }
  //     }
  //   );

  //   res.json({ assessment: response.data.result }); // Adjust based on actual API response
  // } catch (error) {
  //   console.error("Error:", error.message);
  //   res.status(500).json({ error: "Failed to get assessment" });
  // }

  // const apiKey = 'GEMINI_API_KEY'; // Replace with your actual API key
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  const requestData = {
    contents: [
      {
        parts: [
          { text: `these are symptoms  ${symptoms} provide possible disease and provide the structured way and dont include * symbol` }
        ]
      }
    ]
  };
  
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  })
    .then(response => response.json())
    .then(data => {
      const resp = data.candidates[0].content.parts[0].text;
      let cleanedResponse = resp.replace(/\*/g, '');
      res.json({ assessment: cleanedResponse });
      
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  



});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});