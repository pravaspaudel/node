import mongoose from "mongoose";

export default async function connectDB(
    url: string | undefined,
): Promise<void> {
    if (!url) {
        throw new Error("mongoose url is missing");
    }

    try {
        await mongoose.connect(url);
        console.log(`database connneceted successfully`);
    } catch (error) {
        console.log("ERROR in connecting db", error);
    }
}
