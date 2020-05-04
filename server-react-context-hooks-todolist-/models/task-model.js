const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: {type:String, required: true},
  description: {type: String, required: true},
  user: [{type: Schema.Types.ObjectId, ref:"User"}],
  createdDate:{type:String}
  },
  {
    timestamps: {
      createdAt: 'task_created',
    }
  }
);


const Task = mongoose.model('Task', TaskSchema);
module.exports = Task