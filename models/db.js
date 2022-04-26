const mongoose = require( 'mongoose' ); 

const server = 'localhost';
const database = 'hackdoagora';

const db_uri = process.env.DB_URI || `mongodb://${server}/${database}`

class Database {
    _connect(next) {
        console.log("Starting connection with db...")
        mongoose.connect(db_uri).then(()=>{
            console.log("Database connection success!")
            next()
        }).catch(err => console.log(`Could not connect to db: ${err}`))
    }
}

module.exports = new Database();