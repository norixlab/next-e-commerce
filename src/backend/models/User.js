import mongoose from 'mongoose';



const UserSchema = new mongoose.Schema({
username:{
	type: String,
	required: [true, 'Enter your username'],
	unique: true
},
email:{
	type: String,
	required: [true, 'Enter your email'],
	unique: true
},
password:{
	type: String,
	required: [true, 'Enter your password'],
	
},
avatarUrl: String
},
{
	timestamps: true
});

export default mongoose.models.User || mongoose.model('User', UserSchema)