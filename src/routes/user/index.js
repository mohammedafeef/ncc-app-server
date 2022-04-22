const express = require("express");
const eventRouter = require("./event");
const authRouter = require("./auth");
const achivementRouter = require("./achievement");
const userRouter = express.Router();
const galleryRouter = require("./gallery");

userRouter.use("/event", eventRouter);
userRouter.use("/auth", authRouter);
userRouter.use("/achievement", achivementRouter);
userRouter.use("/gallery", galleryRouter);


module.exports = userRouter;
