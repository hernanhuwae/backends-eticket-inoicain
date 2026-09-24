import { Request, Response } from "express";
import * as yup from "yup";
import userModel from "../models/user.model";
import { encrypt } from "../utils/encryption";
import { generateToken } from "../utils/jwt";
import { IReqUser } from "../middleware/auth.middleware";

//Register Data fields
type TRegister = {
  fullname: String;
  username: String;
  email: String;
  password: String;
  confirmPassword: String;
};

type TLogin = {
  identifier: string;
  password: string;
};

//Validation Register Schema
const registerValidateSchema = yup.object({
  fullname: yup.string().required(),
  username: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), ""], "Password must be matched!"),
});

export default {
  
  async register(req: Request, res: Response) {
    const { fullname, username, email, password, confirmPassword } =
      req.body as unknown as TRegister;

    const user_data = await userModel.create({
      fullname,
      username,
      email,
      password,
    });

    try {
      await registerValidateSchema.validate({
        fullname,
        username,
        email,
        password,
        confirmPassword,
      });

      res.status(200).json({
        message: "Register is successfull",
        data: user_data,
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(400).json({
        message: err.message,
        data: null,
      });
    }
  },

  async login(req: Request, res: Response) {
    const { identifier, password } = req.body as unknown as TLogin;

    try {
      //Creating identifier (email or username) with password for login user
      const userByIdentifier = await userModel.findOne({
        $or: [
          {
            username: identifier,
          },
          {
            email: identifier,
          },
        ],
      });

      if (!userByIdentifier) {
        return res.status(403).json({
          message: "user not found",
          data: null,
        });
      }

      //validate the password encrypted for login user
      const validatePassword: boolean =
        encrypt(password) === userByIdentifier.password;

      if (!validatePassword) {
        return res.status(403).json({
          messagae: "password is invalid!",
          data: null,
        });
      }

      //Input Token
      const token = generateToken({
        id: userByIdentifier._id,
        role: userByIdentifier.role,
      });

      res.status(200).json({
        message: "Login is successful!",
        data: token,
      });
    } catch (error) {
      const err = error as unknown as Error;
      return res.status(400).json({
        message: err.message, 
        data: null,
      });
    }
  },

  async profile(req: IReqUser, res: Response) {  //use "IReqUser" to declare "user" to be used globally in typescript 
    try {
      const user = req.user;
      const result = await userModel.findById(user?.id);

      res.status(200).json({
        message: "Get Data User Profile",
        data: result,
      });
    } catch (error) {
      const err = error as unknown as Error;
      return res.status(400).json({
        message: err.message,
        data: null,
      });
    }
  },
};
