const mongoose = require('mongoose');

const connectDB = () => {
    try {
        mongoose.connect(process.env.CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB - connected');
    } catch (error) {
        console.log('error occured while trying', error);
        throw error;
    }
}

module.exports = connectDB
