import {isUndefined} from 'lodash'
import 'reflect-metadata'
import {
  Connection,
  createConnection,
} from 'typeorm'
import * as wait from 'wait-for-stuff'

export default class DB {
  private connection: Connection

  constructor(type: any, host: string, username: string, password: string, database: string, port: number = null) {

    this.connection = wait.for.promise(createConnection({
        type,
        host,
        port,
        username,
        password,
        database,
        synchronize: true,
        logging: false,
        entities: [
          'system/library/entities/**/*.ts',
        ],
      }))

    if (this.connection instanceof Error) {
      throw new Error(this.connection.message)
    }

  }

  public findOne(table: string, conditions?, options?) {
    const repository = this.connection.getRepository(table)

    const result = wait.for.promise(repository.findOne(conditions, options))
    return !isUndefined(result) ? result : {}
  }

  public find(table: string, options?) {
    const repository = this.connection.getRepository(table)
    const result = wait.for.promise(repository.find(options))
    return !isUndefined(result) ? result : []
  }

  public create(table: string) {
    const repository = this.connection.getRepository(table)

    return repository.create()
  }

  public save(table: string, entity) {
    const repository = this.connection.getRepository(table)
    const result = wait.for.promise(repository.save(entity))
    return result
  }
}
