"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const auth_1 = __importDefault(require("./auth"));
const Routes = async (router) => {
    //user
    router.post("/signup", auth_1.default.controllers.signup);
    router.post("/login", auth_1.default.controllers.login);
};
exports.Routes = Routes;
//# sourceMappingURL=Routes.js.map