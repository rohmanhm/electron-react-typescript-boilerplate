const { app } = require('electron')
const { makeDirs } = require('./lib')
const config = require('./config.json')

/**
 * Configuration for
 * SQLite3 - https://github.com/mapbox/node-sqlite3
 * TypeORM - https://www.npmjs.com/package/typeorm
 */
const userHome = app.getPath('home');
const appHome = `${userHome}/${config.appName}/${process.env.NODE_ENV}/`;
const dbFile = 'local.db';
const dbPath = `${appHome}${dbFile}`;
// make dirs in case they don't exist
makeDirs(appHome, dbFile);

console.log('paths ', dbPath);

module.exports = {
  type: 'sqlite',
  database: dbPath,
  synchronize: true,
  synchronize: true,
  autoSave: true,
  logging: true,
  entities: ['./app/database/entities/*.js']
};
