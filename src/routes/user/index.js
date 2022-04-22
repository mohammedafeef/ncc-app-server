const express = require("express");
const eventRouter = require("./event");
const authRouter = require("./auth");
const achivementRouter = require("./achievement");
const userRouter = express.Router();

userRouter.use("/event", eventRouter);
userRouter.use("/auth", authRouter);
userRouter.use("/achievement", achivementRouter);

module.exports = userRouter;
