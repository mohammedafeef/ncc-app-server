const express = require("express");
const eventRouter = require("./event");
const achievementRouter = require("./achievement");
const galleryRouter = require("./gallery");

const publicRouter = express.Router();
publicRouter.use("/achievement", achievementRouter);
publicRouter.use("/event", eventRouter);
publicRouter.use("/gallery", galleryRouter);

module.exports = publicRouter;
