const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('Connecting to', url)

mongoose
  .connect(url)
  .then(result => {
    console.log('connected to mongodb')
  })
  .catch(error => console.log('error connecting to mongodb', error))

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },

  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`,
    },
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
