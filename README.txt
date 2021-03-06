How to start Postgre Server
1. On MacOS, download Postgres.app and pgAdmin
2. Start Postgre.app and initialize a new postgre Server
3. Connect to this server using pgAdmin
4. Create a database called "knowhowapi-dev" for development

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
1. After creating the database called "knowhowapi-dev", you can 
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

How to run all the tests
1. Run: npm run test
2. This will run the Jest tests.

How to Run Tests for all test files once 
1. Click on the Run and Debug button in Visual Studio Code
3. Select "Jest single run all tests" from the Launch program dropdown menu
4. Press the green play button at the top next to "Jest single run all tests" 

How to Run a Test For A Specific test file
1. Open a file ending in *.test.js in Visual Studio Code
2. Click on the Run and Debug button in Visual Studio Code
3. Select "Jest watch current file"from the Launch program dropdown menu
4. Press the green play button at the top next to "Jest watch current file" 

How to Create a Unit test for a database service
1. If you have a service that you want to test, look at some of the service test files ending in *Service.test.js
2. You will see that they use the TestDb class to reset the database after each test.
3. Make sure that you reset the database after every test
4. Look at the knexDbService.test.js for an example of how you can create temproary tables and drop them after the test.
5. For examples of unit tests that do not use TestDb class, check out the passwordService.test.js

How to Export the GraphQL schema and load it into Postman
1. Make sure the application is launched (by click the Launch program button in Visual Studio Code, or by running npm run from Terminal)
2. The from terminal run: npm run export-schema 
3. This will create a file ./graphql/exports/schema.graphql
4. In Postman, create or select an API
5. Then under the Define tab in Postman, select GraphQL.
6. The paste the contents of ./graphql/exports/schema.graphql into the box.
7. Then you can generate a collection based on this schema by clicking "Generate Schema" button
8. If you already have a generated schema, and want to update the the endpoints based on a schema change:
8.1 Under the Collections tab
8.2 Click on an endpoint
8.3 Click the Body tab
8.4 Select GraphQL
8.5 Select the API you made or updated
8.6 Click the refresh button. This will enable syntax checking using the new schema, BUT IT WILL NOT CHANGE THE CODE.
8.7 Look to see if the current query violates the new schema syntax (look for the red underline)
8.8 Update the query AND the data sent to fit the new schema.

