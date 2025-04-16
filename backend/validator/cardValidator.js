import { z } from "zod";

const validateCreateCard = z.object({
  name: z.string().max(30).min(2),
  link: z.string().url(),
  ownerId: z.string(),
});
const validateUpdateCard = z.object({
  cardId: z.string(),
  userId: z.string(),
});

export { validateCreateCard, validateUpdateCard };
