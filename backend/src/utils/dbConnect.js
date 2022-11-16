const mongoose = require("mongoose");

const dbConnect = () => {
//port no for run backend server
const PORT = process.env.PORT || 4445;
const MONGODB_URL = process.env.MONGODB_URL;

//connect to database
mongoose.connect(MONGODB_URL, {
//   useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
//   useFindAndModify: false
}, (error) => {
  if (error) {
    console.log('Database Error: ', error.message);
  }
});

//open connection
mongoose.connection.once('open', () => {
  console.log('NoSQL Database Synced');
});
};

module.exports = { dbConnect };