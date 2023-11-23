"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoverPersonalData = exports.getIdByHash = exports.ZeroAddress = exports.getAddressFromPrivateKey = exports.generateAddress = exports.toChecksumAddress = exports.encodeByte32String = exports.decodeByte32String = exports.sign = void 0;
const bs58_1 = __importDefault(require("bs58"));
const keccak_1 = __importDefault(require("keccak"));
const ethers_1 = require("ethers");
const setlog_1 = __importDefault(require("./setlog"));
const sign = async (types, values, signer) => {
    try {
        let messageHash = ethers_1.ethers.utils.solidityKeccak256(types, values);
        let signature = await signer.signMessage(ethers_1.ethers.utils.arrayify(messageHash));
        return signature;
    }
    catch (err) {
        throw new Error(err.message);
    }
};
exports.sign = sign;
const decodeByte32String = (text) => {
    try {
        return ethers_1.ethers.utils.parseBytes32String(text);
    }
    catch (err) {
        return null;
    }
};
exports.decodeByte32String = decodeByte32String;
const encodeByte32String = (text) => {
    try {
        return ethers_1.ethers.utils.formatBytes32String(text);
    }
    catch (err) {
        return null;
    }
};
exports.encodeByte32String = encodeByte32String;
function stripHexPrefix(value) {
    return value.slice(0, 2) === '0x' || value.slice(0, 2) === '0X' ? value.slice(2) : value;
}
const toChecksumAddress = (address) => {
    try {
        if (typeof address !== 'string')
            return '';
        if (!/^(0x)?[0-9a-f]{40}$/i.test(address))
            return '';
        const stripAddress = stripHexPrefix(address).toLowerCase();
        const keccakHash = (0, keccak_1.default)('keccak256').update(stripAddress).digest('hex');
        let checksumAddress = '0x';
        for (let i = 0; i < stripAddress.length; i++) {
            checksumAddress += parseInt(keccakHash[i], 16) >= 8 ? stripAddress[i]?.toUpperCase() : stripAddress[i];
        }
        return checksumAddress;
    }
    catch (err) {
        console.log(err);
        (0, setlog_1.default)("tochecksumaddress", err);
        return address;
    }
};
exports.toChecksumAddress = toChecksumAddress;
const generateAddress = () => {
    const wallet = ethers_1.ethers.Wallet.createRandom();
    return { privatekey: wallet.privateKey, publickey: wallet.address };
};
exports.generateAddress = generateAddress;
const getAddressFromPrivateKey = (privateKey) => {
    const w = new ethers_1.ethers.Wallet(privateKey);
    return w.address;
};
exports.getAddressFromPrivateKey = getAddressFromPrivateKey;
exports.ZeroAddress = "0x0000000000000000000000000000000000000000";
const getIdByHash = (text) => {
    try {
        const bytes = bs58_1.default.decode(text);
        const hex = Buffer.from(bytes).toString('hex');
        const tokenId = hex.slice(4);
        return tokenId;
    }
    catch (err) {
        (0, setlog_1.default)("getIdByHash", err);
        return null;
    }
};
exports.getIdByHash = getIdByHash;
const recoverPersonalData = (data, hash) => {
    try {
        const k = ethers_1.ethers.utils.keccak256(ethers_1.ethers.utils.toUtf8Bytes("\x19Ethereum Signed Message:\n" + data.length + data));
        const recoveredAddress = ethers_1.ethers.utils.recoverAddress(k, hash);
        return recoveredAddress;
    }
    catch (err) {
        (0, setlog_1.default)("recoverPersonalData", err);
        return null;
    }
};
exports.recoverPersonalData = recoverPersonalData;
//# sourceMappingURL=blockchain.js.map