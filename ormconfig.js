const { config } = require('dotenv');
const path = require('path');
config({ path: path.resolve('./.env') });
const DatabaseConfig = {
  type: 'postgres',
  host: '127.0.0.1',
  port: process.env.DB_PORT || '5432',
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'bookHandling',
  entities: [__dirname + 'src/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: ['database/migration/**/*.js'],
  cli: {
    migrationsDir: 'database/migration',
  },
};

module.exports = DatabaseConfig;
