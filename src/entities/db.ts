import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('bun-db', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});
