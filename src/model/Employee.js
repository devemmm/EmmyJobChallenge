const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema(
  {
    fname: {
      type: String,
      trim: true,
    },
    lname: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    salary: {
      type: Number,
      trim: true,
    },
    dob: {
      type: String,
      trim: true,
    },
    nationality: {
      type: String,
      trim: true,
    },
    zipCode: {
      type: Number,
      trim: true,
    },
    position: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

const Employee = mongoose.model('Employee', employeeSchema)

module.exports = Employee
