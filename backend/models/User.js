import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

import validator from "validator";
import CustomHttpError from "../errors/CustomHttpError.js";

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
  {
    versionKey: false,
    statics: {
      async findUserByCredentials({ email, password }) {
        try {
          const user = await this.findOne({ email }).select("+password");
          if (!user) {
            throw new CustomHttpError({
              message: `E-mail ou senha incorretos`,
            });
          }
          const matched = await bcrypt.compare(password, user.password);
          if (!matched) {
            throw new CustomHttpError({
              message: `E-mail ou senha incorretos`,
            });
          }
          return user;
        } catch (error) {
          throw error;
        }
      },
    },
  }
);

const UserModel = model("user", userSchema);
export { UserModel };
