import mongoose from "mongoose";
import { Role } from "./role.js";
import { User } from "./user.js";

await mongoose.connect(process.env.MONGO_URI)
console.log("database connected successfully")
export {
    User, 
    Role
}