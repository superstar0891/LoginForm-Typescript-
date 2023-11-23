"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sign = exports.ellipsis = exports.randomCode = exports.Now = exports.DecryptPassword = exports.CryptPassword = exports.hex = exports.getNoDoubleArray = exports.fromBigNum = exports.toBigNum = exports.delay = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const ethers_1 = require("ethers");
const blockchain_1 = require("./blockchain");
Object.defineProperty(exports, "sign", { enumerable: true, get: function () { return blockchain_1.sign; } });
/**
 * set delay for delayTimes
 * @param {Number} delayTimes - timePeriod for delay
 */
const delay = (delayTimes) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(2);
        }, delayTimes);
    });
};
exports.delay = delay;
/**
 * change data type from Number to BigNum
 * @param {Number} value - data that need to be change
 * @param {Number} d - decimals
 */
const toBigNum = (value, d = 18) => {
    return ethers_1.ethers.utils.parseUnits(String(value), d);
};
exports.toBigNum = toBigNum;
/**
 * change data type from BigNum to Number
 * @param {Number} value - data that need to be change
 * @param {Number} d - decimals
 */
const fromBigNum = (value, d = 18) => {
    return ethers_1.ethers.utils.formatUnits(value, d);
};
exports.fromBigNum = fromBigNum;
/**
 * change data array to no duplicate
 */
const getNoDoubleArray = (value) => {
    let newArray = [];
    for (let i = 0; i < value.length; i++) {
        if (newArray.indexOf(value[i]) === -1) {
            newArray.push(value[i]);
        }
    }
    return newArray;
};
exports.getNoDoubleArray = getNoDoubleArray;
const hex = (arrayBuffer) => {
    return Array.from(new Uint8Array(arrayBuffer))
        .map(n => n.toString(16).padStart(2, "0"))
        .join("");
};
exports.hex = hex;
const CryptPassword = async (password) => {
    return await bcrypt_1.default.hash(password, 10);
};
exports.CryptPassword = CryptPassword;
// decrypt password
const DecryptPassword = async (password, savedPassword) => {
    return await bcrypt_1.default.compare(password, savedPassword);
};
exports.DecryptPassword = DecryptPassword;
const Now = () => Math.round(new Date().getTime() / 1000);
exports.Now = Now;
const randomCode = () => {
    var minm = 100000;
    var maxm = 999999;
    return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
};
exports.randomCode = randomCode;
const ellipsis = (address, start = 6) => {
    if (!address || address == null)
        return '';
    const len = (start) + 7;
    return address.length > len ? `${address?.slice(0, start)}...${address?.slice(-4)}` : address;
};
exports.ellipsis = ellipsis;
//# sourceMappingURL=index.js.map