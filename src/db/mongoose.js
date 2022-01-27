const mongoose = require('mongoose')
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    return console.log({ system: 'Connected To Database' })
  })
  .catch((error) => {
    return console.log({ system: 'Unable to Connect To Database try Again' })
  })
