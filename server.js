const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

// connectDB
connectDB();

// init Middleware
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));

// Define Routes
app.use("/api/users", require("./routes/User"));
app.use("/api/auth", require("./routes/Auth"));
app.use("/api/contacts", require("./routes/Contact"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set Static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}
