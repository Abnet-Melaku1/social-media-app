const mongoose = require("mongoose")
const connetDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("The database is connected successfully.")
    })
  } catch (error) {
    console.log(error)
  }
}
module.exports = connetDB
