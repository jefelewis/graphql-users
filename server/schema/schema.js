// Imports: GraphQL
const graphql = require('graphql');

// Imports: GraphQL Packages
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;

// Imports: Lodash
// const _ = require('lodash');

// Imports: Axios
const axios = require('axios');


// GraphQL: Schema
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {type: GraphQLString},
    firstName: {type: GraphQLString},
    age: {type: GraphQLInt}
  }
});


// GraphQL: Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {id: {type: GraphQLString}},
      resolve(parent, args){
        // Grab data from Database/API
        // return _.find(users, {id: args.id})
        // Axios: GET (Returns response with data attached to a 'data' object)
        return axios.get(`http://localhost:3000/users/${args.id}`)
          .then((response) => response.data);
      }
    }
  }
});


// Exports
module.exports = new GraphQLSchema({
  query: RootQuery
});