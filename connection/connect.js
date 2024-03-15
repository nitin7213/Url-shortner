const mongoose = require('mongoose');

const handleMongoDB = async (url) => {
  return await mongoose.connect(url);
};

module.exports = { handleMongoDB };
