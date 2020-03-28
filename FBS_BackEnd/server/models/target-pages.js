const mongoose = require("mongoose");

mongoose.set("debug", true);

const { Schema } = mongoose;

const TargetPagesSchema = new Schema(
  {
    target_date_in: { type: Date },
    target_link: { type: String },
    target_desc: { type: String }
  },
  {
    versionKey: false
  }
);

const TargetPages = mongoose.model(
  "Target_Pages",
  TargetPagesSchema,
  "Target_Pages"
);

module.exports = TargetPages;
