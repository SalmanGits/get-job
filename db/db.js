
const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false,
};
const connectToDB = ()=>{
mongoose.connect(process.env.URI, options)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
}
module.exports = connectToDB