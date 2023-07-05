const { Schema, model } = require('mongoose');

const keysSchema = new Schema({
  emailName: String,
  apiKeys: [String],
});

module.exports = model('Keys', keysSchema);
