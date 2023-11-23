"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = __importDefault(require("./controllers"));
const services_1 = __importDefault(require("./services"));
const models_1 = __importDefault(require("./models"));
const Auth = {
    controllers: controllers_1.default,
    services: services_1.default,
    models: models_1.default
};
exports.default = Auth;
//# sourceMappingURL=index.js.map