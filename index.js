const express = require('express');
const connectDB = require('./config/db')

const app = express();

app.use(express.json());
//app.use(express.urlencoded({ extended: true }));


connectDB();

app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const PORT = 5002;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})