// Imports: GraphQL
const graphql = require('graphql');

// Imports: GraphQL Packages
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, graphQLList, GraphQLList, GraphQLNonNull } = graphql;

// Imports: Lodash
// const _ = require('lodash');

// Imports: Axios
const axios = require('axios');


// GraphQL: Schemas
const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    field: {type: GraphQLString},
    users: {
      type: new GraphQLList(UserType),
      // Resolve creates an Edge between each Node on the Graph
      resolve(parent, args) {
        // Axios: GET (Returns response with data attached to a 'data' object)
        return axios.get(`http://localhost:3000/companies/${parent.id}/users`)
        .then((res) => res.data);
      }
    }
  })
})

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {type: GraphQLString},
    firstName: {type: GraphQLString},
    age: {type: GraphQLInt},
    company: {
      type: CompanyType,
      // Resolve creates an Edge between each Node on the Graph
      resolve(parent, args) {
        // Axios: GET (Returns response with data attached to a 'data' object)
        return axios.get(`http://localhost:3000/companies/${parent.companyId}`)
        .then((res) => res.data);
      }
    }
  })
});


// GraphQL: Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    // User
    user: {
      type: UserType,
      args: {id: {type: GraphQLString}},
      resolve(parent, args){
        // Grab data from Database/API
        // Axios: GET (Returns response with data attached to a 'data' object)
        return axios.get(`http://localhost:3000/users/${args.id}`)
          .then((res) => res.data);
      }
    },
    // Company
    company: {
      type: CompanyType,
      args: {id: {type: GraphQLString}},
      resolve(parent, args){
        // Grab data from Database/API
        // Axios: GET (Returns response with data attached to a 'data' object)
        return axios.get(`http://localhost:3000/companies/${args.id}`)
          .then((res) => res.data);
      }
    }
  })
});

// GraphQL: Root Mutation
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // Add User
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new  GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString }
      },
      resolve(parent, { firstName, age }) {
        // Axios: POST
        return axios.post('http://localhost:3000/users', { firstName, age })
          .then((res) => res.data);
      }
    },
    // Delete User
    deleteUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString }
      },
      resolve(parent, { firstName, age }) {
        // Axios: DELETE
        return axios.delete('http://localhost:3000/users', { firstName, age })
          .then((res) => res.data); 
      }
    }
  })
});


// Exports
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutation
});