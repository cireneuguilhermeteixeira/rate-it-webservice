const mongoose = require('../connection/Connection');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : {type : String, required : true },
    email : {type : String , index : true},
    password: {type : String, required : true  },
});

module.exports = mongoose.model('User',UserSchema);