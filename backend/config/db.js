const mongoose = require('mongoose')
const colors = require('colors')

// Mongoose Strict Query
mongoose.set('strictQuery', false)

// Connect To Database Function
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI)

    console.log(conn.connection.host.yellow)
  } catch (err) {
    console.log(err)
  }
}

module.exports = connectDB
