import dotenv from "dotenv"

dotenv.config({path:['.env'],quiet:true})

const PORT:number = Number(process.env.PORT)
const MONGO_URL:string = String(process.env.MONGO_URL)

export {PORT,MONGO_URL}




