// 1. Setting Up a React App:
// Install Dependencies:
// npx create-react-app apollo-client-example
// cd apollo-client-example
// npm install @apollo/client graphql
// 2.Configure Apollo Client:
// src/index.js:
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import App from './App';

const client = new ApolloClient({
  uri: 'https://graphqlbin.com/v2/RYJTfN', // Replace with your GraphQL server URL
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

4. Create a Component to Fetch and Display Data:
src/App.js:
import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {data.users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
5. // Run Your React App:npm start

// 6. Adding a Mutation to Update Data:
// Update src/App.js to Include Mutation:

import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

const ADD_USER = gql`
  mutation AddUser($name: String!, $email: String!) {
    addUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  const [addUser] = useMutation(ADD_USER);

  const handleAddUser = async () => {
    try {
      // Perform mutation
      await addUser({
        variables: { name: 'New User', email: 'newuser@example.com' },
      });
    } catch (error) {
      console.error('Mutation error:', error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {data.users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
};

export default App;

// In this example, the ADD_USER mutation is used to add a new user. After the mutation is performed, Apollo Client's InMemoryCache is automatically updated with the new data. The GET_USERS query reflects the updated data from the cache without making an additional network request.

// This example demonstrates the basic usage of Apollo Client's InMemoryCache for caching query results and how mutations automatically update the cache. Adjustments can be made based on your specific GraphQL schema and requirements.
