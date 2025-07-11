import { EmailService } from "./services/EmailService";


const emailService = new EmailService();

(async () => {
  const email = {
    to: "vivekkumar002216@gmail.com",
    subject: "Hello",
    body: "Testing email",
    messageId: "msg-001",
  };

  const result = await emailService.sendEmail(email);
  console.log(result);
})();
