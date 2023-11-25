const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // creating conn variable to connect with my MONGO_URI
        const conn = await mongoose.connect(process.env.MONGO_URI);

        // Msg to know if MongoDB connected properly or not
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(error);
        process.exit(1); // Exit process with failure of value 1
    }
}

module.exports = connectDB;