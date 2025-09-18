import mongoose from "mongoose";

const connectDb = (url: string) => {
  mongoose
    .connect(url)
    .then(() => {
      console.log("database connected successfully");
    })
    .catch((error) => {
      console.log("connection falied", error);
    });
};



export {connectDb}
