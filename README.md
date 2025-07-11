# email-service
This is a backend email-sending service written in TypeScript. It uses two mock providers and includes retry logic, fallback, rate limiting, idempotency, and status tracking.


## 1. Project Setup

Clone the repository and install dependencies:

git clone https://github.com/Vivek213005/email-service.git
cd email-service
npm install
 
npm install -g typescript
 

## 2. Run Instructions

### Build the project:
    npm run build
### Start the server:
    npm start
    
Server runs on: `http://localhost:3000`
 
## 3. Test Instructions

To run unit tests:
      npm run test
 
Test files are located in the `/src/tests/` directory. The tests cover core logic like retry, fallback, and rate-limiting behavior.

## 4. Assumptions

- This project does not send real emails. The providers are mocked with success/failure probabilities.
- Idempotency and rate limiting are implemented in-memory (suitable for demo purposes, not production).
- Status tracking is per `messageId` and also stored in-memory.
- Retry logic uses exponential backoff and a maximum of 3 attempts.
- Rate limiting allows 5 requests per second globally.

---

## 5. Architecture Explanation

### Core Modules:

- **EmailService**: Contains the core logic. It handles sending an email with retry and fallback, applies rate limiting, and ensures idempotency.
- **Providers (ProviderA & ProviderB)**: Simulate third-party email providers with success probabilities.
- **RateLimiter**: Prevents more than 5 emails from being processed per second.
- **Logger**: Captures each send attempt with timestamp and status.
- **CircuitBreaker** (if implemented): Temporarily disables a provider after repeated failures.

### Request Flow:

1. A POST request is made to `/send-email` with payload including `to`, `subject`, `body`, and `messageId`.
2. EmailService checks rate limits and if the same messageId was already sent.
3. It tries ProviderA with retry and backoff.
4. If ProviderA fails, it falls back to ProviderB.
5. The result (success/failure/fallback) is returned with metadata.
 
## Example API Usage

**POST /send-email**

Request:

```json
{
  "to": "test@example.com",
  "subject": "Hello",
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