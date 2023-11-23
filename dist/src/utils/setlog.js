"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const colors_1 = __importDefault(require("colors"));
const setlog = function (title, msg, noWrite) {
    const date = new Date();
    const datetext = [
        date.getUTCFullYear(),
        ("0" + (date.getUTCMonth() + 1)).slice(-2),
        ("0" + date.getUTCDate()).slice(-2),
    ].join("-");
    const timetext = [
        ("0" + date.getUTCHours()).slice(-2),
        ("0" + date.getUTCMinutes()).slice(-2),
        ("0" + date.getUTCSeconds()).slice(-2),
    ].join(":");
    let isError = false;
    if (msg && msg.message && msg.stack) {
        if (msg.code === "NETWORK_ERROR" || msg.code === "EAI_AGAIN") {
            msg = "could not detect network";
        }
        else {
            msg = msg.stack || msg.message;
        }
        isError = true;
    }
    if (msg)
        msg = msg
            .split(/\r\n|\r|\n/g)
            .map((v) => "\t" + String(v))
            .join("\r\n");
    if (!noWrite)
        fs.appendFileSync(__dirname + "/../../logs/" + datetext + ".log", `[${timetext}] ${title}\r\n${msg ? msg + "\r\n" : ""}`);
    if (msg && isError)
        msg = colors_1.default.red(msg);
    console.log(colors_1.default.gray("[" + timetext + "]"), colors_1.default.white(title), msg ? "\r\n" + msg : "");
};
exports.default = setlog;
//# sourceMappingURL=setlog.js.map