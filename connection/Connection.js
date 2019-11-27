const mongoose = require('mongoose')
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/rate-it'
mongoose.connect(mongoURI)
.then(connection => {
    console.log('success');
}).catch(error => {
    console.error('error to connect', error);
})

module.exports = mongoose
