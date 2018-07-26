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
  mutation {
    addBook(name: "", genre: "", authorId: "") {
      name
      id
    }
  }
`;

export { getAuthorsQuery, getBooksQuery, addBookMutation };
