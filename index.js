import express from "express";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"
import bodyParser from "body-parser";
import dotenv from "dotenv";
import passport from "passport";
import mongoose from "mongoose";
import session from 'express-session'
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// app.use((req, res, next) => {
//   res.status(404); 
//   res.render('404', { message: "Page not found" }); 
// });
app.use(passport.initialize());
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 600000 } 
}));
mongoose
  .connect("mongodb://localhost:27017/bro1")
  .then((res) => {
    console.log(`databse connected succes full`);
  })
  .catch((error) => {
    console.log(error);
  });
app.set("view engine", "ejs");
app.set("views", "./Views");
app.use(bodyParser.json());
app.use(express.static("views/user"));
app.use(express.static("views/admin"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", userRoutes);
app.use("/admin", adminRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
