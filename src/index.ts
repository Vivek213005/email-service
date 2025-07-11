import express, { Request, Response } from "express";
import EmailService from "./services/EmailService";

const app = express();
const emailService = new EmailService();

app.use(express.json());

app.post("/send-email", async (req: Request, res: Response) => {
  try {
    const result = await emailService.sendEmail(req.body);
    res.json(result);
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.get("/status/:messageId", (req: Request, res: Response) => {
  const status = emailService.getStatus(req.params.messageId);
  if (!status) {
    return res.status(404).json({ error: "Message ID not found" });
  }
  res.json(status);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
