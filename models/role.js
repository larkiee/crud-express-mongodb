import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  title: String,
  isAdmin: Boolean,
}, {timestamps: true});

const Role = mongoose.model("Role", roleSchema, "roles");

export { Role };
