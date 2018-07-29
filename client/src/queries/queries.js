import { gql } from 'apollo-boost';

const getBooksQuery = gql`
  {
    get_all_books {
      name
      id
      genre
    }
  }
`;

const getAuthorsQuery = gql`
  {
    get_all_authors {
      name
      age
      id
    }
  }
`;

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

const getBookQuery = gql`
  query($id: ID) {
    get_me_a_book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`


export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery };
