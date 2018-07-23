import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getBooksQuery = gql`
  {
    get_all_books {
      name
      id
      genre
    }
  }
`

class BookList extends Component {
  displayBooks() {
    var data = this.props.data;
    if (data.loading) {
      return(<div>Loading books...</div>);
    } else {
      console.log(this.props);
      return data.get_all_books.map(book => {
        return(
          <li key={ book.id }>{ book.name } ({ book.genre })</li>
        );
      })
    }
  }
  render() {
    return (
      <div>
        <ul id="book-list">
          { this.displayBooks() }
        </ul>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
