import movieModel, { movieType } from "../models/movie";

//controllers for graphql

const getAllMovies = async (): Promise<movieType[]> => {
    return await movieModel.find();
};

const getMovieById = async (id: string): Promise<movieType | null> => {
    return await movieModel.findById(id);
};

const addMovie = async (args: {
    title: string;
    released: number;
    director: string;
    rating?: number;
    cast?: string[];
    language?: string;
    country?: string;
    description?: string;
}): Promise<movieType> => {
    const movie = new movieModel(args);
    return await movie.save();
};

const updateMovie = async (
    id: string,
    updates: Partial<{
        title: string;
        released: number;
        director: string;
        rating: number;
        cast: string[];
        language: string;
        country: string;
        description: string;
    }>,
): Promise<movieType | null> => {
    return await movieModel.findByIdAndUpdate(id, updates, { new: true });
};

const deleteMovie = async (id: String) => {
    return movieModel.findByIdAndDelete(id);
};

export { getAllMovies, getMovieById, updateMovie, deleteMovie, addMovie };
