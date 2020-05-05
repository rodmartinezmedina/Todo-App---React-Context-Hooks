const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}]
  },
  {
    timestamps: {
      createdAt: 'user_created'
    }
  }
);

const User = mongoose.model('User', UserSchema);
module.exports = User