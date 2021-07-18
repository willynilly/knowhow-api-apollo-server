How to start Postgre Server
1. On MacOS, download Postgres.app and pgAdmin
2. Start Postgre.app and initialize a new postgre Server
3. Connect to this server using pgAdmin
4. Create a database called "knowhowapi"

How to Modify the Database Tables with Migrations
1. Run the following (making sure to replace the variable in the migration name):
npx knex migrate:make migration_{whatever_you_doing}
2. Manually edit the migration file with knex code to modify your database (see blog post below)
See https://www.heady.io/blog/knex-migration-for-schema-and-seeds-with-postgresql
3. Run 
npx knex migrate:latest
4. Check your database

How to Seed Database
1. Run the following:
npx knex seed:make {some positive integer}_seed_{some model name}
As an example: npx knex seed:make 01_seed_users
2. Run
npx knex seed:run

How to Both Run Default Migrations and Seed Database
1. After creating the database called "knowhowapi", you can 
quickly create and seed the tables by executing the following command:
npm run setupdb

How to Start knowhowapi
1. Make sure the postgre server is running
2. Open project in Visual Studio Code
3. If you have not added the tables using the method above, 
open the terminal in Visual Studio Code and then type: npm run migrate
4. If you have not added the seed data from the method above,
then in terminal, type: npm run seed
5. Then run the code either in VS Code by "Launch Program" or type: npm start
