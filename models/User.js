import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 30,
      minlength: 2,
      required: true,
    },
    about: {
      type: String,
      maxlength: 30,
      minlength: 2,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
      validate: {
        validator: (v) => {
          return /^(https?:\/\/)(www\.)?([a-zA-Z0-9._~:/?%#\[\]@!$&'()*+,;=-]+)(\/[a-zA-Z0-9._~:/?%#\[\]@!$&'()*+,;=-]*)?(#\w*)?$/.test(
            v
          );
        },
        message: "Essa não é uma URL valida",
      },
    },
  },
  { versionKey: false }
);

const UserModel = model("user", userSchema);
export { UserModel };
