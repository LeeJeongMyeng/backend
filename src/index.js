const express = require('express');
const path = require('path');
const app = express();
const port = 8080;
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONG0_URI)
	.then(() => {
		console.log('연결완료');
	}).catch(err => {
	console.error(err);
});

app.get('/', (req, res, next) => {
	// res.send('안녕하세요!');
	setImmediate(() => {
		next(new Error('it is an error'));
	});

	
});

app.post('/', (req, res) => {
	console.log(req.body);
	res.json(req.body);
});

app.use('/users',require('./routes/users'));

//에러처리기
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.send(error.message || '서버에서 에러 발생');
});
app.use(express.static(path.join(__dirname, '../uploads')));

app.listen(port, () => {
	console.log(`${port}port에서 실행`);
});
