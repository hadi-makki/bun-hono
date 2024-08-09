import { DataTypes, Model, type Optional } from 'sequelize';
import { sequelize } from './db';
import { User } from './user-entity';
import type { Category } from './category-entity';

interface PostAttributes {
  id: string;
  title: string;
  content: string;
  userId: string;
}

interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {}

class Posts
  extends Model<PostAttributes, PostCreationAttributes>
  implements PostAttributes
{
  public id!: string;
  public title!: string;
  public content!: string;
  public userId!: string;

  // Association methods
  public addCategory!: (category: Category) => Promise<void>;
  public addCategories!: (categories: Category[]) => Promise<void>;
  public getCategories!: () => Promise<Category[]>;
  public hasCategory!: (category: Category) => Promise<boolean>;
  public countCategories!: () => Promise<number>;
}

Posts.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Posts',
  },
);

// Set up the relationship
User.hasMany(Posts, { foreignKey: 'userId' });
Posts.belongsTo(User, { foreignKey: 'userId' });

export { Posts };
