

export const movieTypeDefs = `
  type Movie {
    id: ID!
    title: String!
    released: Int!
    director: String!
    rating: Float
    cast: [String!]
    language: String
    country: String
    description: String
  }

  type Query {
    getMovies: [Movie]
    getMovieById(id: ID!): Movie
  }

  type Mutation {
    addMovie(
      title: String!
      released: Int!
      director: String!
      rating: Float
      cast: [String!]
      language: String
      country: String
      description: String
    ): Movie

    updateMovie(
      id: ID!
      title: String
      released: Int
      director: String
      rating: Float
      cast: [String!]
      language: String
      country: String
      description: String
    ): Movie

    deleteMovie(id: ID!): Movie
  }
`;
