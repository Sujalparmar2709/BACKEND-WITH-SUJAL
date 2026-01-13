const mongoose = require('mongoose');


mongoose.connect("mongodb://127.0.0.1:27017/testapp1");

const userSchema = mongoose.Schema({
    image: String,
    email: String,
    name: String,
});

// Export the compiled model so other files can call mongoose APIs on it
module.exports = mongoose.model('user', userSchema);
