import { addMovie, deleteMovie, getAllMovies, getMovieById, updateMovie } from "../../controllers/movieControllers";

export const movieResolvers = {
    Query: {
        getMovies: async () => await getAllMovies(),
        getMovieById: async (_: any, { id }: { id: string }) =>
            await getMovieById(id),
    },
    Mutation: {
        addMovie: async (
            _: any,
            args: {
                title: string;
                released: number;
                director: string;
                rating?: number;
                cast?: string[];
                language?: string;
                country?: string;
                description?: string;
            },
        ) => await addMovie(args),

        updateMovie: async (
            _: any,
            {
                id,
                ...updates
            }: { id: string } & Partial<{
                title: string;
                released: number;
                director: string;
                rating: number;
                cast: string[];
                language: string;
                country: string;
                description: string;
            }>,
        ) => await updateMovie(id, updates),

        deleteMovie: async (_: any, { id }: { id: string }) =>
            await deleteMovie(id),
    },
};
