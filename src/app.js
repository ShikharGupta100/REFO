const express = require('express');

const app = express();

app.use(express.json());

// Importing Routes

const authRouter = require("./routes/auth.routes");


/**
 * Routes
 */
app.use("/api/auth",authRouter);

module.exports = app;