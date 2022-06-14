import { ApolloServer, gql } from 'apollo-server';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    id: String
    title: String
    author: String
    year: Int
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    book(id: ID!): Book # ID! means mandatory, we return only one object of type book
  }
`;

const dataSource = [
  {
    id: '1',
    title: 'The Awakening',
    author: 'Kate Chopin',
    year: 1894,
  },
  {
    id: '2',
    title: 'City of Glass',
    author: 'Paul Auster',
    year: 1925,
  },
  {
    id: '3',
    title: 'Infinite Jest',
    author: 'David Foster Wallace',
    year: 1996,
  },
  {
    id: '4',
    title: 'Pet Semetary',
    author: 'Stephen King',
    year: 1989,
  },
  {
    id: '5',
    title: 'Der Mann ohne Eigenschaften',
    author: 'Robert Musil',
    year: 1930,
  },
  {
    id: '6',
    title: 'Master i Margerita',
    author: 'Mikhail Bulgakov',
    year: 1967,
  },
  {
    id: '7',
    title: 'Die Schachnovelle',
    author: 'Stefan Zweig',
    year: 1943,
  },
  {
    id: '8',
    title: 'Le Petit Prince',
    author: 'Antoine de Saint-Exupéry',
    year: 1943,
  },
  {
    id: '9',
    title: 'Ein paar Leute suchen das Glück und lachen sich tot',
    author: 'Sibylle Berg',
    year: 1997,
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => dataSource,
    book: (parent, args) => {
        // arguments object in the resolver
      return dataSource.find((book) => book.id === args.id); // the arg is always a string! so better to use strings as IDs often
    }
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
