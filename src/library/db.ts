import {isUndefined} from 'lodash'
import 'reflect-metadata'
import {
  Connection,
  createConnection,
} from 'typeorm'
import {db} from 'rapin-config'

export default class DB {
  private connection: Connection

  constructor() {}
  public async init() {
    this.connection = await createConnection({
      type: db.engine,
      host: db.host,
      port: db.port,
      username: db.username,
      password: db.password,
      database: db.database,
      synchronize: false,
      logging: false,
      entities: [
        'entities/**/*.ts',
      ],
    })
    if (this.connection instanceof Error) {
      throw new Error(this.connection.message)
    }
  }

  public queryBuilder(table: string) {
    return this.connection.getRepository(table).createQueryBuilder(table)
  }

  public async queryMany(query: any): Promise<Object> {
    const result = await query.getMany()
    return !isUndefined(result) ? result : {}
  }
  public async queryCount(query: any): Promise<Object> {
    const result = await query.getCount()
    return !isUndefined(result) ? result : 0
  }

  public repository(table: string) {
    return this.connection.getRepository(table)
  }

  public async findOne(table: string, conditions?, options?) {
    const repository = this.connection.getRepository(table)

    const result = await repository.findOne(conditions, options)
    return !isUndefined(result) ? result : {}
  }

  public async find(table: string, options?) {
    const repository = this.connection.getRepository(table)
    const result = await repository.find(options)
    return !isUndefined(result) ? result : []
  }

  public create(table: string) {
    const repository = this.connection.getRepository(table)

    return repository.create()
  }

  public async save(table: string, entity) {
    const repository = this.connection.getRepository(table)
    const result = await repository.save(entity)
    return result
  }

  public async delete(table: string, options) {
    const repository = this.connection.getRepository(table)
    const result = await repository.delete(options)
    return result
  }
}
