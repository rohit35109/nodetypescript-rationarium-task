# NodeJS-Express-Typescript-rationarium-task

## Getting Started
1. Make sure you have Docker installed on your system.
2. Use command npm run `docker-start` to start the docker instance and to completely stop and remove the containers you can use `docker-stop-complete` command.
3. Docker container compliles the typescript file and then initiates the unit test cases and if all successful then application starts.
4. In case if you do not want to use docker, please make sure you have mysql installed on your local machine and you have database user, table, password as given in docker-compose file.

## Introduction
This project was given as a task to showcase my nodejs and typescript skills. So basically this will have a REST API endpoints that allows user to add, delete, list and update books. With unit testing and docker implementation using expressjs framework. 

## Framework Used
1. Express - To develop restfull api serivce for backend application.
## Library Used:
1. debug - is a module that we will use to avoid calling console.log() while developing our application.
2. winstonis - responsible for logging requests to our API and the responses (and errors) returned.
3. cors - is a piece of Express.js middleware that allows us to enable cross-origin resource sharing.
4. joi - to validate request inputs.
5. sequelize - ORM for database operations.
6. shortid - to generate random unique number.
7. Jest - for unit testing.

### Good to have or Improvement:
1. I have written only few test cases due to short of time. But in the real time we need to have lots of test cases for different scenarios.
2. I have give passwords and db name into the .env file or docker file but in real time this has to come from a vault of more secure way.
3. As this is not a production level app, i have created data folder that persists the data accross the system. In real time we would have database at seperate place and not inside a docker container.
4. In terms of code quality, I have made sure that i showcase my typescript knowledge but in real time we can make this much better by adding enums, return type of a function and more to increase the readablity of the code and make use of tight coupling with typescript.
5. Currently, i have not implemented watch properly that would make developer live easy. As of now everytime we change the code in app folder we have to restart the docker container which is not a good solution and can be configured to watch app folder to rerender code automatically when made any changes.

