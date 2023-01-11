const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'გთხოვთ შეავსოთ სახელის გრაფა'],
    },
    lastName: {
      type: String,
      required: [true, 'გთხოვთ შეავსოთ გვარის გრაფა'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'გთხოვთ შეავსოთ ელ.ფოსტის გრაფა'],
    },
    password: {
      type: String,
      required: [true, 'გთხოვთ შეავსოთ პაროლის გრაფა'],
    },
    avatar: {
      type: String,
    },
    subjects: [],
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

module.exports = User
