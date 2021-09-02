This sample full-stack project is an NX.js workspace with two projects inside:
- shopping-list-ui (A React UI)
- shopping-list-api (An express API backend)

To run the full-stack project do the following:
1. Install dependencies: `yarn install`
2. Bring up a PostgreSQL instance inside Docker: `docker-compose up`
   - This will create a database server with the _shoppinglist_ database created alongside a default user. This is the database the API will interact with.
3. Connect to your PostgreSQL in your database IDE and execute the contents of _init.sql_ to create the _items_ table
   - The URI to connect: `postgres://user:password@localhost:5432/shoppinglist`
4. In a separate terminal window, start the API: `yarn start shopping-list-api`
   - The API will startup on port 3333
5. In a separate terminal window, start the UI: `yarn start shopping-list-ui`
   - The UI will be started on port 4200 and can be seen at http://localhost:4200
6. At this point you should have your database listening on port 5432, your API listening on port 3333, and your UI listening on port 4200.

