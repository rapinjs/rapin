import driverMysql from 'sync-mysql'
import {isEmpty, size} from 'lodash'

export default class mysql {
    constructor(hostname, username, password, database, port = '3006') {
        this.connection = new driverMysql({
            host     : hostname,
            user     : username,
            password : password,
            database : database,
            port: port
        })

        this.connection.query("SET NAMES 'utf8'")
        this.connection.query("SET CHARACTER SET utf8")
        this.connection.query("SET CHARACTER_SET_CONNECTION=utf8")
        this.connection.query("SET SQL_MODE = ''")
    }

    query(sql) {
        if(this.connection) {
            const results = this.connection.query(sql)

            let query = {
                rows: results,
                num_rows: size(results),
                row: !isEmpty(results) ? results[0] : {}
            }

            return query
        }
    }

    escape(value) {
        if(this.connection) {
            // return this.connection.escape(value)
            return value
        }
    }

    countAffected() {
        if(this.connection) {
            return this.connection.query(`SELECT ROW_COUNT() as row_count;`)[0].row_count
        }
    }

    getLastId() {
        if(this.connection) {
            return this.connection.query(`SELECT LAST_INSERT_ID() as last;`)[0].last
        }
    }
}