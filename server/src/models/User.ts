import mongoose, { Schema } from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    password: String
});

const User = mongoose.model('User', userSchema);

export default User;