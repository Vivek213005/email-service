import { EmailRequest } from "../types";

export class ProviderA {
  async sendEmail(req: EmailRequest): Promise<boolean> {
    return Math.random() < 0.7;
  }
}
