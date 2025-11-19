import { api } from "@/api/api";

class ContactService {
  public static async submit(args: {
    name: string;
    email: string;
    company: string;
    website: string;
    country: string;
    phone: string;
    services: string[];
    message: string;
  }) {
    const response = await api.post<void>("/api/v1/contact", args);
    return response.data;
  }
}

export default ContactService;
