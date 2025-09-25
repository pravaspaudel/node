import mongoose from "mongoose";

export default async function connectDB(url:string){

    try{
        await mongoose.connect(url)

        console.log(`connected to database successfully`)

    }
    catch{

    }

}
