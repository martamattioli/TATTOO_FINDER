const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  users: [{
    type: mongoose.Schema.ObjectId, ref: 'User',
    required: true,
    validate: [mustBeTwo, 'Please contain two users.']
  }],
  messages: [{
    sender: { type: mongoose.Schema.ObjectId, ref: 'User' },
    content: { type: String }
  }]
});

function mustBeTwo() {
  const self = this;
  return self.users.length === 2;
}

chatSchema.index({users: 1}, {unique: true});

module.exports = mongoose.model('Chat', chatSchema);
