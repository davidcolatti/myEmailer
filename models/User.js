const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String
});

// creating a new collection called users in mongoDb
mongoose.model('users', userSchema);
