"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const EmailService_1 = __importDefault(require("./services/EmailService"));
const app = (0, express_1.default)();
const emailService = new EmailService_1.default();
app.use(express_1.default.json());
app.post("/send-email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield emailService.sendEmail(req.body);
        res.json(result);
    }
    catch (error) {
        console.error("Email send error:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
}));
app.get("/status/:messageId", (req, res) => {
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
