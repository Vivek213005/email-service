Email Sending Service

This is a backend service built in TypeScript to simulate sending emails using multiple providers with
fault tolerance and resiliency.

Features
- Retry mechanism with exponential backoff
- Fallback between two providers
- Idempotency using messageId
- Basic rate limiting (5 requests per second)
- Status tracking for each email send attempt

Project Structure
- src/types.ts: Defines EmailRequest and EmailStatus interfaces
- src/providers/ProviderA.ts: Mock email provider with 70% success rate
- src/providers/ProviderB.ts: Mock email provider with 80% success rate
- src/utils/rateLimiter.ts: Implements basic rate limiting logic
- src/services/EmailService.ts: Main logic to handle sending email with retries, fallback, and tracking
- src/index.ts: Entry point and API handler (Express)

Installation
Clone the repository and install dependencies.

git clone https://github.com/your-username/email-service.git
cd email-service
npm install

Running the Server
To build and run the project:

npm run build
npm start

Or for development with live reload:
npm run dev

API Endpoint
POST /send-email

Request Body:
{
 "to": "test@example.com",
 "subject": "Test Email",
 "body": "This is a test email.",
 "messageId": "msg-001"
}

Response:
{
 "status": "success",
 "providerUsed": "ProviderA",
 "attempts": 1,
 "messageId": "msg-001",
 "timestamp": "2025-07-11T10:00:00.000Z"
}

Running Tests
npm run test


Assumptions
- Email sending is mocked for testing purposes.
- Idempotency and status tracking are implemented in memory.
- No external libraries are used beyond required essentials.

Author 
Vivek Kumar