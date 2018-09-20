// import {UserGuaranteeInfo} from 'system/library/entities/UserGuaranteeInfo'
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import {Role} from './Role'

@Entity({name: 'oc_user'})
export class User {

  @PrimaryGeneratedColumn({
    name: 'user_id',
  })
  public id: number

  @Column({
    type: 'varchar',
    name: 'first_name',
    length: 256,
    default: '',
  })
  public firstName: string

  @Column({
    type: 'varchar',
    name: 'last_name',
    length: 256,
    default: '',

  })
  public lastName: string

  @Column({
    type: 'varchar',
    name: 'email',
    length: 50,
    default: '',
  })
  public email: string

  @Column({
    type: 'varchar',
    name: 'telephone',
    length: 50,
    default: '',

  })
  public telephone: string

  @Column({
    type: 'varchar',
    name: 'image',
    default: '',
  })
  public image: string

  @Column({
    type: 'varchar',
    name: 'password',
    default: '',
  })
  public password: string

  @Column({
    type: 'varchar',
    name: 'salt',
    default: '',
  })
  public salt: string

  @Column({
    type: 'int',
    name: 'role_id',
    default: '2',
  })
  public roleId: string

  @ManyToOne((type) => Role, (role) => role.users)
  @JoinColumn({name: 'role_id'})
  public role: Role
}
