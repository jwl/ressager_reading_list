import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// components
import BookList from './components/BookList'

// apollo client setup
const apollo_client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={apollo_client}>
        <div id="main">
          <h1>My Reading List</h1>
          <BookList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
