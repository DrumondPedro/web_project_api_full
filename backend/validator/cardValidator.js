import { z } from "zod";

const validateCreateCard = z.object({
  name: z.string().max(30).min(2),
  link: z.string().url(),
  owner: z.string(),
});
const validateLikeCard = z.object({
  cardId: z.string(),
  userId: z.string(),
});

export { validateCreateCard, validateLikeCard };
