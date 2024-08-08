import { Hono } from 'hono';
import { typeOrm, userRepository } from './entities/db';

const app = new Hono();

await typeOrm
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

app.get('/', async (c) => {
  const user = await userRepository.save({
    username: 'John Doe',
    dateOfBirth: new Date('1990-01-01').toISOString(),
  });
  console.log('User created:', user);
  return c.json(user);
});

app.onError((err, c) => {
  console.error(`${err}`);
  return c.text('Custom Error Message', 500);
});

export default {
  port: 3005,
  fetch: app.fetch,
};
