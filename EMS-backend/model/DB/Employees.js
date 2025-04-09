const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  file_source: { type: String },
  category: { type: String },
  status: {
    type: String,
    enum: ["pending", "finished", "failed", "accepted"],
    default: "pending",
  },
  comment_by_employee: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  task_deadline: Date,
  updatedAt: { type: Date, default: null },
  submit_date: { type: Date, default: null },
});
const EmployeeSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, index: true },
  password: { type: String, required: true },
  name: { type: String },
  profilePicture: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  },
  tasks: [TaskSchema],
});
module.exports = mongoose.model("employees", EmployeeSchema);
