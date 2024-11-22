const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["New", "In Progress", "Resolved"], // Các trạng thái của ticket
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"], // Mức độ ưu tiên
      default: "Medium",
    },
    contactOrCompany: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact", // Hoặc liên kết với `Company`
      required: true,
    },
    assignedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Người dùng được chỉ định
    },
    category: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", TicketSchema);
