import { DataTypes, Model, type Optional } from 'sequelize';
import { sequelize } from './db';

interface UserAttributes {
  id: string;
  username: string;
  birthday?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;
  public username!: string;
  public birthday?: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    birthday: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: 'User',
  },
);

export { User };
