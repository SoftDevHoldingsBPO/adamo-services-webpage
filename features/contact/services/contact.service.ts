import { api } from "@/api/api";

class ContactService {
  public static async contact(args: {
    fullName: string;
    corporateEmail: string;
    companyName: string;
    companyWebsite: string;
    country: string;
    phone: string;
    solutionsOfInterest: string[];
    message: string;
  }) {
    const response = await api.post<void>("/api/v1/commercial/inquiry", args);
    return response.data;
  }
}

export default ContactService;
