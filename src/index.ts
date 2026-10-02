import express from "express";
import router from "./routes/api";
import bodyParser from "body-parser";
import db from "./utils/database"
import docs from "./docs/route";
import cors from 'cors'

async function Init() {

  try {

    //connect to mongoDb
    const res = await db()

    console.log("DB connect", res);
    

    const app = express();

    const PORT = 8000;

    //For Vercel shows this API is running on server
    app.get("/", (req,res)=>{
      res.status(200).json({
        message: "Server is running!",
        data: null
      })
    })

    //activate API access to frontend
    app.use(cors())

    app.use(bodyParser.json());

    app.use("/api", router);

    //Activate swagger documentation
    docs(app)

    app.listen(PORT, () => {
      console.log(`SERVER IS RUNNING ON PORT http://localhost:${PORT}`);
    });

  } catch (error) {

    console.log(error);
    
  }
}

Init();
