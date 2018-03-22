// Imports: GraphQL
const graphql = require('graphql');

// Imports: GraphQL Packages
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;

// Imports: Lodash
const _ = require('lodash');


// GraphQL: Dummy Data
let users = [
  {id: 23, firstName: 'Bill', age: 20},
  {id: 47, firstName: 'Samantha', age: 21}
]

// GraphQL: Schema
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {type: GraphQLString},
    firstName: {type: GraphQLString},
    age: {type: GraphQLInt}
  })
});


// GraphQL: Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: UserType,
      args: {id: {type: GraphQLString}},
      resolve(parent, args){
        // Grab data from Database/API
        return _.find(users, {id: args.id})
      }
    }
  }
});


// Exports
module.exports = new GraphQLSchema({
  query: RootQuery
});