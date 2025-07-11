"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canSendEmail = canSendEmail;
const RATE_LIMIT = 5;
const WINDOW_TIME = 1000;
let timestamps = [];
function canSendEmail() {
    const now = Date.now();
    timestamps = timestamps.filter(t => now - t < WINDOW_TIME);
    if (timestamps.length >= RATE_LIMIT)
        return false;
    timestamps.push(now);
    return true;
}
