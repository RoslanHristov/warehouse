# DEV NOTES
- No calculations are done on the REST API side (overengineered the solution from the start where all logic is done on the graph side) :) 
- The REST API is only used to show that the concept of connection the grap to outside data sources works
- First time using GraphQL and Apollo server.
# Running the application with docker compose

- Make sure you have docker and docker compose installed
- Run `docker compose up` in the root directory of the project 
this will start the application and the database
- After that you can access the application at http://localhost:3000/graphql

# Running the application without docker compose

- Make sure you have nodejs and npm installed
- Run `npm install` in each directory (warehouse-management, warehouse-management-client)
- Run `npm run start` in each directory (warehouse-management, warehouse-management-client)
- Apollo server: the graphql playground is available at http://localhost:3000/graphql
