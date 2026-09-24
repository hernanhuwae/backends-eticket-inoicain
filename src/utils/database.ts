import mongoose from 'mongoose'
import { DATABASE_URL } from './env'


//Conneting database to MongoDB
const connect = async () => {

    try {
        await mongoose.connect(DATABASE_URL, {
            dbName : "inoicain-eticket"
        })

        return Promise.resolve("my database connected!")

    } catch (error) {
        return Promise.reject(error)
    }

}

export default connect