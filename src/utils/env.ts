import doteenv from "dotenv"

doteenv.config()

export const DATABASE_URL : string = process.env.DATABASE_URL || ""; 

//In app.js
export const SECRET : string = process.env.SECRET || "";