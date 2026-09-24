import express from "express";
import router from "./routes/api";
import bodyParser from "body-parser";
import db from "./utils/database"

async function Init() {

  try {

    //connect to mongoDb
    const res = await db()

    console.log("DB connect", res);
    

    const app = express();

    const PORT = 8000;

    app.use(bodyParser.json());
    app.use("/api", router);

    app.listen(PORT, () => {
      console.log(`SERVER IS RUNNING ON PORT http://localhost:${PORT}`);
    });

  } catch (error) {

    console.log(error);
    
  }
}

Init();
