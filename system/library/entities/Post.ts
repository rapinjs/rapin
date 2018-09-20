import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity({name:'oc_post'})
export class Post {

  @PrimaryGeneratedColumn({
    name: 'post_id',
  })
  public id: number

  @Column({
    type: 'varchar',
    name: 'title',
    length: 256,
  })
  public title: string

  @Column({
    type: 'varchar',
    name: 'name',
    length: 256,
  })
  public name: string

  @Column({
    type: 'text',
    name: 'description',
  })
  public description: string

  @Column({
    type: 'varchar',
    name: 'image',
    length: 256,
  })
  public image: string
}
