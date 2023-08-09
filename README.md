# nodetypescript-rationarium-task
This project was given as a task to showcase my nodejs and typescript skills. So basically this will have a REST API endpoints that allows user to add, delete, list and update books. With unit testing and docker implementation using expressjs framework. 

## Framework Used
1. Express - To develop restfull api serivce for backend application.
## Library Used:
1. debug - is a module that we will use to avoid calling console.log() while developing our application. This way, we can easily filter debug statements during troubleshooting. They can also be switched off entirely in production instead of having to be removed manually.
2. winstonis - responsible for logging requests to our API and the responses (and errors) returned. express-winston integrates directly with Express.js, so that all standard API-related winston logging code is already done.
3. cors - is a piece of Express.js middleware that allows us to enable cross-origin resource sharing. Without this, our API would only be usable from front ends being served from the exact same subdomain as our back end.
