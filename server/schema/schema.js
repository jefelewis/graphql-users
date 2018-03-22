// Imports: GraphQL
const graphql = require('graphql');

// Imports: GraphQL Packages
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// Imports: Lodash
const _ = require('lodash');


// GraphQL: Dummy Data
let users = [
  {id: 23, firstName: 'Bill', age: 20},
  {id: 47, firstName: 'Samantha', age: 21}
]

// GraphQL: Schema
const UserType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    genre: {type: GraphQLString}
  })
});


// GraphQL: Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
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