 export interface EmailRequest {
  to: string;
  subject: string;
  body: string;
  messageId: string;
}

export interface EmailStatus {
  status: 'success' | 'retrying' | 'fallback' | 'failed';
  providerUsed: string;
  attempts: number;
  messageId: string;
  timestamp: string;
}
