const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    address: {
      type: String,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true } // Lưu ngày tạo và cập nhật
);

module.exports = mongoose.model("Company", CompanySchema);
