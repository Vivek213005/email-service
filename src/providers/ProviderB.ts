 import { EmailRequest } from "../types";

export class ProviderB {
  async sendEmail(req: EmailRequest): Promise<boolean> {
    return Math.random() < 0.8;
  }
}
