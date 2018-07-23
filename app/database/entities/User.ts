import { Entity, Generated, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('user')
class User {
  @Column({
    unique: true,
    primary: true
  })
  @Generated('uuid')
  id: string

  @Column()
  name: string

  @Column({
    nullable: true
  })
  class: string

  @Column({
    nullable: true
  })
  nik: string

  @Column({
    nullable: true
  })
  address: string

  @Column({
    default: false
  })
  isDeleted: boolean

  @Column({
    default: 0
  })
  balance: number

  @CreateDateColumn()
  createDate: string

  @UpdateDateColumn()
  updateDate: string
}

export default User
