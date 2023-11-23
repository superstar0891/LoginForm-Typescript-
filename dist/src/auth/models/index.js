"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const AuthSchema = new Schema({
    name: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        default: "",
    },
    address: {
        type: String,
        default: '',
    },
    lasttime: {
        type: Number,
        default: 0,
    },
    created: {
        type: Number,
        default: 0,
    }
});
const Auth = mongoose_1.default.model("auths", AuthSchema);
const AuthModels = {
    Auth
};
exports.default = AuthModels;
//# sourceMappingURL=index.js.map