# Running the application with docker compose

- Make sure you have docker and docker compose installed
- Run `docker-compose up` in the root directory of the project 
this will start the application and the database

# Running the application without docker compose

- Make sure you have nodejs and npm installed
- Run `npm install` in each directory (warehouse-management, warehouse-management-client)
- Run `npm run start` in each directory (warehouse-management, warehouse-management-client)

# Apollo server
- The graphql playground is available at http://localhost:3000/graphql

# DEV NOTES
- No calculations are done on the REST API side (Didn't read the requirements correct) and ended up doing all the calculations on the Graph side :) 
- The REST API is only used to show that the concept of connection the grap to outside data sources works
- Might have overengineered the solution a bit... never used GraphQL and Apollo before