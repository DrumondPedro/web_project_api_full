import { z } from "zod";

const validateCreateUser = z.object({
  name: z.string().max(30).min(2).optional(),
  about: z.string().max(30).min(2).optional(),
  avatar: z.string().url().optional(),
  email: z.string().email(),
  password: z.string().min(8),
});

const validateIdUser = z.object({
  userId: z.string().min(10),
});

const validateUpdateUser = z.object({
  userId: z.string().min(10),
  name: z.string().max(30).min(2).nullable(),
  about: z.string().max(30).min(2).nullable(),
});

const validateUpdateAvatar = z.object({
  userId: z.string().min(10),
  avatar: z.string().url(),
});

export {
  validateCreateUser,
  validateIdUser,
  validateUpdateUser,
  validateUpdateAvatar,
};
