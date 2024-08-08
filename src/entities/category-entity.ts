import { DataTypes, Model, type Optional } from 'sequelize';
import { sequelize } from './db';
import { Posts } from './post-entity';

interface CategoryAttributes {
  id: string;
  name: string;
}

interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, 'id'> {}

class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  public id!: string;
  public name!: string;

  // Association methods
  public addPost!: (post: Posts) => Promise<void>;
  public addPosts!: (posts: Posts[]) => Promise<void>;
  public getPosts!: () => Promise<Posts[]>;
  public hasPost!: (post: Posts) => Promise<boolean>;
  public countPosts!: () => Promise<number>;
}

Category.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Category',
  },
);

// Set up the relationships
Posts.belongsToMany(Category, { through: 'PostCategory' });
Category.belongsToMany(Posts, { through: 'PostCategory' });

export { Category };
