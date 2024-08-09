import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { sequelize } from './entities/db';
import { User } from './entities/user-entity';
import { Posts } from './entities/post-entity';
import { Category } from './entities/category-entity';
const app = new Hono();
sequelize.sync({ alter: true }).then(() => {
  console.log('Database schema updated to match models!');
});

app.get('/', async (c) => {
  // const user = await User.create({
  //   username: 'bun',
  //   birthday: new Date(),
  // });

  const allUsers = await User.findAll();
  console.log(allUsers);

  const user = await User.findOne({
    where: { username: 'bun' },
    include: Posts,
  });
  console.log(user);

  if (!user) {
    throw new HTTPException(404);
  }

  // const createCategory = await Category.create({
  //   name: 'Test',
  // });
  const createCategory = await Category.findOne({
    where: { name: 'Test' },
  });

  if (!createCategory) {
    throw new HTTPException(404);
  }

  // const createPost = await Posts.create({
  //   title: 'Hello World',
  //   content: 'This is a test post',
  //   userId: user.id,
  // });

  // Associate the post with the category
  // await createPost.addCategory(createCategory);

  const getPost = await Posts.findAll({
    include: [
      {
        model: Category,
        through: {
          attributes: [],
        },
      },
      {
        model: User,
        attributes: ['id', 'username', 'birthday'],
      },
    ],
  });

  return c.json(getPost);
});

export default {
  port: 3005,
  fetch: app.fetch,
};
