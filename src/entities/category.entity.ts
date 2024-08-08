import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  name!: string;

  @OneToMany(() => Post, (post) => post.category, { cascade: true })
  posts!: Post[];
}
