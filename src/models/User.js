const { default: mongoose } = require('mongoose');
const useSchema = mongoose.Schema({
	name: {
		type: String,
		maxLength: 50,
	},
	email: {
		type: String,
		trim: true, //빈칸없애줌
		unique: true,
	},
	password: {
		type: String,
		minLength: 5,
	},
	role: {
		type: Number,
		default: 0,
	},
	image: String,
});

const User = mongoose.model('User', useSchema);

module.exports = User;