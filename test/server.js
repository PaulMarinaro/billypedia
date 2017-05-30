'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
	console.log('Running on http://localhost:3000');
});

app.use(express.static(path.join(__dirname, '../.master')));
