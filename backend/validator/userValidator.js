import { z } from "zod";

const validateCreateUser = z.object({
  name: z.string().max(30).min(2),
  about: z.string().max(30).min(2),
  avatar: z.string().url(),
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
