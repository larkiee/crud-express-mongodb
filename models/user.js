import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    phoneNumber: {type: String, unique: true},
    firstName: String,
    lastName: String,
    passwordHash: String,
    roleID: {type: mongoose.Schema.ObjectId, references: "roles"}
}, {timestamps: true})

const User = mongoose.model("User", userSchema, "users")

export { User }