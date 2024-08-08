import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { Category } from './category.entity';
import { Post } from './post.entity';

export const typeOrm = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'bun-db',
  entities: ['src/*/**.entity.ts'],
  logging: true,
  synchronize: true,
});

export const userRepository = typeOrm.getRepository(User);
