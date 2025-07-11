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
Object.defineProperty(exports, "__esModule", { value: true });
const ProviderA_1 = require("../providers/ProviderA");
const ProviderB_1 = require("../providers/ProviderB");
const rateLimiter_1 = require("../utils/rateLimiter");
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
class EmailService {
    constructor() {
        this.providerA = new ProviderA_1.ProviderA();
        this.providerB = new ProviderB_1.ProviderB();
        this.statusMap = new Map();
    }
    sendEmail(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.statusMap.has(req.messageId)) {
                return this.statusMap.get(req.messageId);
            }
            if (!(0, rateLimiter_1.canSendEmail)()) {
                const status = this.buildStatus('failed', 'none', 0, req.messageId);
                this.statusMap.set(req.messageId, status);
                return status;
            }
            let attempts = 0;
            let success = false;
            for (let i = 0; i < 3; i++) {
                attempts++;
                success = yield this.providerA.sendEmail(req);
                if (success) {
                    const status = this.buildStatus('success', 'ProviderA', attempts, req.messageId);
                    this.statusMap.set(req.messageId, status);
                    return status;
                }
                yield sleep(100 * Math.pow(2, i));
            }
            for (let i = 0; i < 3; i++) {
                attempts++;
                success = yield this.providerB.sendEmail(req);
                if (success) {
                    const status = this.buildStatus('fallback', 'ProviderB', attempts, req.messageId);
                    this.statusMap.set(req.messageId, status);
                    return status;
                }
                yield sleep(100 * Math.pow(2, i));
            }
            const status = this.buildStatus('failed', 'ProviderB', attempts, req.messageId);
            this.statusMap.set(req.messageId, status);
            return status;
        });
    }
    buildStatus(status, provider, attempts, messageId) {
        return {
            status,
            providerUsed: provider,
            attempts,
            messageId,
            timestamp: new Date().toISOString(),
        };
    }
    getStatus(messageId) {
        return this.statusMap.get(messageId);
    }
}
exports.default = EmailService;
