const mongoose = require("mongoose")

mongoose.connect(
    "mongodb+srv://ayushpandey:QPZMal%40123@cluster.fl6ysgy.mongodb.net/"
  );

  const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      token: {
        type: String,
      },
  })

  const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    isComplete: {
        type: Boolean,  
    },
    belongsTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
  })

  const User = mongoose.model("User", UserSchema);
  const Todo = mongoose.model("Todo", TodoSchema);

  module.exports = {User, Todo}

