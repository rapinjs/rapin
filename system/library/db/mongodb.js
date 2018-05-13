import connect from 'mongodb'
import wait from 'wait-for-stuff'

export default class mongodb {
    constructor(hostname, username, password, database, port = '27017') {
        const client = wait.for.promise(connect.MongoClient.connect('mongodb://'+hostname+':'+port, {useNewUrlParser: true}))
        this.connection = client.db(database)
     }

    query({collection, type, data}) {
        let result = false
        if(this.connection) {
            if(type === 'find') {
                result = wait.for.promise(this.connection.collection(collection).find(data).toArray())
            }
            if(type === 'insert') {
                result = wait.for.promise(this.connection.collection(collection).insert(data))
            }
            if(type === 'update') {
                result = wait.for.promise(this.connection.collection(collection).update(data[0], data[1]))
            }
            if(type === 'insertMany') {
                result = wait.for.promise(this.connection.collection(collection).insertMany(data))
            }
            if(type === 'deleteOne') {
                result = wait.for.promise(this.connection.collection(collection).deleteOne(data))
            }
        }

        return result
    }

    escape(value) {
        if(this.connection) {
            // return this.connection.escape(value)
            return value
        }
    }

    countAffected() {
        if(this.connection) {
            return false
        }
    }

    getLastId() {
        if(this.connection) {
            return false
        }
    }
}