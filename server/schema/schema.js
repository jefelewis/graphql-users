// Imports: GraphQL
const graphql = require('graphql');

// Imports: GraphQL Packages
const { 
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull 
} = graphql;

// Imports: Lodash
// const _ = require('lodash');

// Imports: Axios
const axios = require('axios');


// GraphQL: Schemas
// Company Schema
const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: {type: GraphQLID},
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

// User Schema
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {type: GraphQLID},
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
      args: {id: {type: GraphQLID}},
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
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        // Grab data from Database/API
        // Axios: GET (Returns response with data attached to a 'data' object)
        return axios.get(`http://localhost:3000/companies/${args.id}`)
          .then((res) => res.data);
      }
    }
  })
});


// GraphQL: Root Mutations
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
      // Can I change to just args? Test once complete
      resolve(parent, args) {
        // Axios: POST
        return axios.post('http://localhost:3000/users', args)
          .then((res) => res.data);
      }
    },
    // Delete User
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        // Axios: DELETE
        return axios.delete(`http://localhost:3000/users/${args.id}`)
          .then((res) => res.data);
      }
    },
    // Edit User
    editUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLString }
      },
      resolve(parent, args) {
        // Axios: PATCH
        return axios.patch(`http://localhost:3000/users/${args.id}`, args)
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