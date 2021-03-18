const mongoose = require('mongoose');

const LoginSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password:{
        type : String,
        require:true
    },
    date:{
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Login',LoginSchema);