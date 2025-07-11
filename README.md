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

Author
Vivek Kumar
