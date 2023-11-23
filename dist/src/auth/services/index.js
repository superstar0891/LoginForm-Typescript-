"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blockchain_1 = require("../../utils/blockchain");
const data_access_1 = __importDefault(require("../data-access"));
// check if account is exist
const checkExistOfAccount = async ({ name, email, address }) => {
    var existsAddress = await data_access_1.default.AuthDB.findOne({
        filter: { address: address }
    });
    if (!!existsAddress)
        return {
            res: true,
            param: "address",
            msg: "address is Exist"
        };
    var existsName = await data_access_1.default.AuthDB.findOne({
        filter: { name: name }
    });
    if (!!existsName)
        return {
            res: true,
            param: "name",
            msg: "name is Exist"
        };
    var existsEmail = await data_access_1.default.AuthDB.findOne({
        filter: { email: email }
    });
    if (!!existsEmail)
        return {
            res: true,
            param: "email",
            msg: "email is Exist"
        };
    return {
        res: false,
        param: "none",
        msg: "true"
    };
};
// check signature is invalid
const verifySignature = ({ sig, address }) => {
    const msg = `Welcome to CBETWORLD! \n Click to sign in and accept the Terms of Service. \n This request will not trigger a blockchain transaction or cost any gas fees. \n Wallet address: ${address}`;
    const sigAddress = (0, blockchain_1.recoverPersonalData)(msg, sig);
    return sigAddress !== address;
};
const authService = {
    checkExistOfAccount,
    verifySignature
};
exports.default = authService;
//# sourceMappingURL=index.js.map