import { Schema, model } from "mongoose";
import validator from "validator";

const userSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 30,
      minlength: 2,
      required: true,
      default: "Jacques Cousteau",
    },
    about: {
      type: String,
      maxlength: 30,
      minlength: 2,
      required: true,
      default: "Explorer",
    },
    avatar: {
      type: String,
      required: true,
      default:
        "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
      validate: {
        validator: (v) => {
          return /^(https?:\/\/)(www\.)?([a-zA-Z0-9._~:/?%#\[\]@!$&'()*+,;=-]+)(\/[a-zA-Z0-9._~:/?%#\[\]@!$&'()*+,;=-]*)?(#\w*)?$/.test(
            v
          );
        },
        message: "Essa não é uma URL valida",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => {
          return validator.isEmail(v);
        },
        message: "Esse não é um email valido",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
  },
  { versionKey: false }
);

const UserModel = model("user", userSchema);
export { UserModel };
