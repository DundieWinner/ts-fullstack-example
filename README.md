This sample full-stack project is an NX.js workspace with two projects inside:
- shopping-list-ui (A React UI)
- shopping-list-api (An express API backend)

To run the full-stack project do the following:
1. Install dependencies: `yarn install`
2. Bring up a PostgreSQL instance inside Docker: `docker-compose up`
3. Connect to your PostgreSQL in your database IDE and execute the content of init.sql to create the _items_ table
4. In a separate terminal window, start the API: `yarn start shopping-list-api`
   - The API will startup on port 3333
5. In a separate terminal window, start the UI: `yarn start shopping-list-ui`
   - The UI will be started on port 4200 and can be seen at http://localhost:4200

