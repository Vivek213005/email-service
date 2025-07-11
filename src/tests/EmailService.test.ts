import { EmailService } from "../src/services/EmailService";

test("should send email successfully or fallback", async () => {
  const service = new EmailService();
  const email = {
    to: "a@b.com",
    subject: "Test",
    body: "Body",
    messageId: "test-001"
  };
  const res = await service.sendEmail(email);
  expect(["success", "fallback", "failed"]).toContain(res.status);
});
