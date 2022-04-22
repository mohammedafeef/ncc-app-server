const express = require("express");
const eventRouter = require("./event");
const achievementRouter = require("./achievement");

const publicRouter = express.Router();
publicRouter.use("/achievement", achievementRouter);
publicRouter.use("/event", eventRouter);

module.exports = publicRouter;
