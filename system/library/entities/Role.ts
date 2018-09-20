import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {User} from './User'

@Entity({name: 'oc_role'})
export class Role {

  @PrimaryGeneratedColumn({
    name: 'role_id',
  })
  public id: number

  @Column({
    type: 'varchar',
    name: 'codename',
    length: 254,
  })
  public codename: string

  @Column({
    type: 'varchar',
    name: 'name',
    length: '254',
  })
  public name: string

  @Column({
    type: 'longtext',
    name: 'description',
  })
  public description: string

  @OneToMany((type) => User, (user) => user.role)
  public users: User[]
}
