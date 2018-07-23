import { ipcMain } from 'electron'
import DbConn from './connection'

ipcMain.on('TEST', async (event: any, type: any, data: any) => {
  try {
    const dbconn = new DbConn()
    await dbconn.connect()

    dbconn.createUser({})
    console.log(event, type, data)
  } catch (err) {
    console.log('wow', err)
  }
})

export default ipcMain
