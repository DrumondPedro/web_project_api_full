import { z } from "zod";

const validateCreateUser = z.object({
  name: z.string().max(30).min(2).optional(),
  about: z.string().max(30).min(2).optional(),
  avatar: z.string().url().optional(),
  email: z.string().email(),
  password: z.string().min(8),
});

const validateUpdateUser = z.object({
  id: z.string(),
  name: z.string().max(30).min(2).nullable(),
  about: z.string().max(30).min(2).nullable(),
});

const validateUpdateAvatar = z.object({
  id: z.string(),
  avatar: z.string().url(),
});

export { validateCreateUser, validateUpdateUser, validateUpdateAvatar };
