import { createConnection, Connection } from 'typeorm'
import UserEntity from './entities/User'

class DatabaseConn {
  public connection: Connection

  constructor () {}

  public async connect () {
    this.connection = await createConnection()
  }

  public async createUser (data: any) {
    const userRepo = this.connection.getRepository('User')
    const user = new UserEntity()
    user.address = 'alasdowo'
    user.balance = 3000
    user.class = '9b'
    user.name = 'Joko'
    user.nik = 'jsfksdfj'

    await userRepo.save(user)

    return user
  }
}

export default DatabaseConn
