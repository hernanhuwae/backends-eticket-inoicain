import express, { Request, Response } from "express"
import authController from "../controllers/auth.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = express.Router()

//Main Router
router.get("/", (req : Request , res : Response) => {
    res.status(200).json({
        message : "API is working!"
    })
})

//Routers
router.post("/auth/register", authController.register)
router.post("/auth/login", authController.login)
router.get("/auth/profile", authMiddleware, authController.profile)


export default router;

