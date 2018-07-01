const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

// dummy data
var dummy_book_data = [
  {name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1'},
  {name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2'},
  {name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3'},
  {name: 'The Fifth Season', genre: 'Sci-Fi', id: '7', authorId: '4'},
  {name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2'},
  {name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3'},
  {name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3'},
  {name: 'The Obelisk Gate', genre: 'Sci-Fi', id: '8', authorId: '4'},
  {name: 'The Stone Sky', genre: 'Sci-Fi', id: '9', authorId: '4'},
];

var dummy_author_data = [
  {name: 'Patrick Rothfuss', age: 44, id: '1'},
  {name: 'Brandon Sanderson', age: 42, id: '2'},
  {name: 'Terry Pratchett', age: 66, id: '3'},
  {name: 'N.K. Jemisin', age: 45, id: '4'},
];


const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(dummy_author_data, { id: parent.authorId });
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(dummy_book_data, { authorId: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    get_me_a_book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(dummy_book_data, { id: args.id });
      }
    },
    get_me_an_author: {
      type: AuthorType,
      args: {id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(dummy_author_data, { id: args.id });
      }
    },
    get_all_books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return dummy_book_data
      }
    },
    get_all_authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return dummy_author_data
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
})
