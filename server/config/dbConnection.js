const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const connectToDB = async ()=>{
    try {
        const {connection} = await mongoose.connect(
            process.env.MONGODB_URI || "mongodb://localhost:27017/my_database"
        );

        if (connection) {
            console.log(`Connected to DB ${connection.host}`);
        }

    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectToDB;