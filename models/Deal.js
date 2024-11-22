const mongoose = require("mongoose");

const DealSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    contactOrCompany: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact", // hoặc 'Company' tùy theo liên kết
      required: true,
    },
    stage: {
      type: String,
      required: true,
      enum: [
        "Prospecting",
        "Qualification",
        "Proposal",
        "Negotiation",
        "Closed Won",
        "Closed Lost",
      ], // Các giai đoạn
    },
    closeDate: {
      type: Date,
    },
    notes: {
      type: String,
    },
    owner: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Deal", DealSchema);
    