import mongoose from 'mongoose';
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

import indexRouter from './routes/index.js';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve() + '/views');
app.set('layout', 'layouts/layout');

app.use(expressLayouts);
app.use(express.static('public'));

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => {
	console.log('Connected to Mongoose')
});

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000, () => {
	console.log('server running');
});
