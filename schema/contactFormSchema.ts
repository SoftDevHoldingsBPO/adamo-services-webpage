import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().min(1),
  website: z.string().min(1),
  country: z.string().min(1),
  phone: z.string(),
  services: z.array(z.string()).min(1),
  message: z.string(),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;
