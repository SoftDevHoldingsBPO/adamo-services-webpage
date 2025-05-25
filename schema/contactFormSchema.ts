import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string(),
  website: z.string(),
  country: z.string().min(1),
  phone: z.string(),
  services: z.array(z.string()),
  message: z.string(),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;
