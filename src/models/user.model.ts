import mongoose from "mongoose";
import { encrypt } from "../utils/encryption";

export interface User {
  fullname: string;
  username: string;
  email: string;
  password: string;
  role: string;
  profilePicture: string;
  isActive: boolean;
  activationCode: string;
}

const schema = mongoose.Schema;

//Schema data model User

const userSchema = new schema<User>(
  {
    fullname: {
      type: schema.Types.String,
      required: true,
    },

    username: {
      type: schema.Types.String,
      required: true,
    },

    email: {
      type: schema.Types.String,
      required: true,
    },

    password: {
      type: schema.Types.String,
      required: true,
    },

    role: {
      type: schema.Types.String,
      enum: ["admin", "user"],
      default: "user",
    },

    profilePicture: {
      type: schema.Types.String,
      default: "user.jpg",
    },

    isActive: {
      type: schema.Types.Boolean,
      default: false,
    },

    activationCode: {
      type: schema.Types.String,
    },
  },
  {
    timestamps: true,
  },
);

//Middleware for encryption password before saving/posting the data user model fully
userSchema.pre("save", function (next) {

  this.password = encrypt(this.password)

  next();

})

//Hidden password from response body data user model (check to Login API body data response)
userSchema.methods.toJSON = function () {
  
  const user = this.toObject();
  delete user.password;
  return user;

}



//Saving data schema to mongoDb
const userModel = mongoose.model("User", userSchema);

export default userModel;
