// Imports: Express
const express = require('express');
const app = express();

// Imports: GraphQL
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

// Imports: Middleware
const morgan = require('morgan');
const bodyParser = require('body-parser');


// Use: Middleware
app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema
}));

// Use: Static Files


// Use: Router
// app.use('./router.js');

// Define: Port
const port = 3000;

// Listener
app.listen(port, () => {
  console.log('The server has started on port:  ' + port);
});