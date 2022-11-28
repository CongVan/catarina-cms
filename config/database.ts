export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 55000),
      database: env('DATABASE_NAME', 'catarina-cms'),
      user: env('DATABASE_USERNAME', 'postgres'),
      password: env('DATABASE_PASSWORD', 'postgrespw'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
