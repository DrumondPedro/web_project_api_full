import { Schema, model } from "mongoose";

const cardSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 30,
      minlength: 2,
      required: true,
    },
    link: {
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const CardModel = model("card", cardSchema);
export { CardModel };
