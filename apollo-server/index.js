const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Todo {
    id: ID
    title: String
    completed: Boolean
    username: String
  }
  type Query {
    todos: [Todo]
  }
`;

const data = [
  { id: 1, title: "write task", completed: false, username: "" },
  { id: 2, title: "study task", completed: false, username: "" },
  { id: 3, title: "report task", completed: false, username: "" },
];

const resolvers = {
  Query: {
    todos: () => data,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log("server is running on", url);
});
