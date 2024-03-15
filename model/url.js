const mongoose = require('mongoose');

const urlSchema = mongoose.Schema(
  {
    shortId: {
      type: String,
      default: '',
      unique: true,
      required: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visHistory: [
      //takes array of timestamps
      {
        timestamps: {
          type: Number,
        },
      },
    ],
  },
  { timestamp: true }
);

const urlModel = mongoose.model('urls', urlSchema);

module.exports = urlModel;
