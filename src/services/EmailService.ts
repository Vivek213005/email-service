import { EmailRequest, EmailStatus } from "../types";
import { ProviderA } from "../providers/ProviderA";
import { ProviderB } from "../providers/ProviderB";
import { canSendEmail } from "../utils/rateLimiter";

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class EmailService {
  private providerA = new ProviderA();
  private providerB = new ProviderB();
  private statusMap = new Map<string, EmailStatus>();

  async sendEmail(req: EmailRequest): Promise<EmailStatus> {
     
    if (this.statusMap.has(req.messageId)) {
      return this.statusMap.get(req.messageId)!;
    }
 

    if (!canSendEmail()) {
      const status = this.buildStatus('failed', 'none', 0, req.messageId);
      this.statusMap.set(req.messageId, status);
      return status;
    }

    let attempts = 0;
    let success = false;
 

    for (let i = 0; i < 3; i++) {
      attempts++;
      success = await this.providerA.sendEmail(req);
      if (success) {
        const status = this.buildStatus('success', 'ProviderA', attempts, req.messageId);
        this.statusMap.set(req.messageId, status);
        return status;
      }
      await sleep(100 * Math.pow(2, i));  
    }
 

    for (let i = 0; i < 3; i++) {
      attempts++;
      success = await this.providerB.sendEmail(req);
      if (success) {
        const status = this.buildStatus('fallback', 'ProviderB', attempts, req.messageId);
        this.statusMap.set(req.messageId, status);
        return status;
      }
      await sleep(100 * Math.pow(2, i));
    }
 
    const status = this.buildStatus('failed', 'ProviderB', attempts, req.messageId);
    this.statusMap.set(req.messageId, status);
    return status;
  }

  private buildStatus(
    status: EmailStatus["status"],
    provider: string,
    attempts: number,
    messageId: string
  ): EmailStatus {
    return {
      status,
      providerUsed: provider,
      attempts,
      messageId,
      timestamp: new Date().toISOString(),
    };
  } 

  public getStatus(messageId: string): EmailStatus | undefined {
    return this.statusMap.get(messageId);
  }
}
 
export default EmailService;
