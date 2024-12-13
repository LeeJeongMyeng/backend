const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		maxLength:50
	},
	email: {
		type: String,
		trim: true,
		unique: true
	},
	password: {
		type: String,
		minLength: 5
	},
	role: {
		type: Number,
		default: 0,
	},
	image: String
});

//유저 스키마 생성 후 save 하기전에
userSchema.pre('save', async function(next){
	let user = this; //유저의 Data가들어감
  if(user.isModified('password')){
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(user.password, salt);
		user.password = hash;
	}

	next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;