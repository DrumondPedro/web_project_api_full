import { Schema, model } from "mongoose";

import validator from "validator";

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
          return validator.isURL(v);
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
