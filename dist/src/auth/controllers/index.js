"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../../utils");
const setlog_1 = __importDefault(require("../../utils/setlog"));
const config_json_1 = __importDefault(require("../../../config.json"));
const blockchain_1 = require("../../utils/blockchain");
const data_access_1 = __importDefault(require("../data-access"));
const services_1 = __importDefault(require("../services"));
const authController = {
    // This function is for signing up a new user.
    signup: async (req, res) => {
        try {
            const { name, email, address, sign } = req.body;
            // service
            const existsMail = await services_1.default.checkExistOfAccount({ name, email, address });
            if (existsMail.res === true) {
                throw new Error(`${existsMail.param} is already exist!`);
            }
            ;
            // service
            if (!services_1.default.verifySignature({ sig: sign, address: address })) {
                throw new Error("invalid signature");
            }
            ;
            // data access
            await data_access_1.default.AuthDB.create({
                name: name,
                email: email,
                address: (0, blockchain_1.toChecksumAddress)(address),
                created: (0, utils_1.Now)(),
                lasttime: (0, utils_1.Now)(),
            });
            return res.status(200).json({ message: "success" });
        }
        catch (err) {
            (0, setlog_1.default)("request", err);
            return res.status(200).send({ message: err.message || "internal error" });
        }
    },
    login: async (req, res) => {
        try {
            const { address, sign } = req.body;
            // service
            if (!services_1.default.verifySignature({ sig: sign, address: address })) {
                throw new Error("invalid signature");
            }
            ;
            // data access
            const userData = await data_access_1.default.AuthDB.findOne({
                filter: { $or: [{ address: (0, blockchain_1.toChecksumAddress)(address) }] }
            });
            if (!userData) {
                return res.status(200).send({ message: "No exists user." });
            }
            // data access
            const data = {
                email: userData?.email,
                name: userData?.name,
                address: (0, blockchain_1.toChecksumAddress)(address)
            };
            const token = jsonwebtoken_1.default.sign(data, config_json_1.default.JWT_SECRET, {
                expiresIn: "144h",
            });
            await data_access_1.default.AuthDB.update({
                filter: { address: data.address },
                update: { lasttime: (0, utils_1.Now)() }
            });
            return res.status(200).json({ message: "success", token });
        }
        catch (err) {
            (0, setlog_1.default)("request", err);
            res.status(200).send({ message: "internal error" });
        }
    },
    middleware: (req, res, next) => {
        try {
            const token = req.headers.authorization || "";
            jsonwebtoken_1.default.verify(token, config_json_1.default.JWT_SECRET, async (err, userData) => {
                if (err)
                    return res.sendStatus(403);
                const user = await data_access_1.default.AuthDB.find({
                    filter: {
                        email: userData.email
                    },
                });
                if (user.length == 0)
                    return res.sendStatus(403);
                req.user = {
                    name: userData.name,
                    email: userData.email
                };
                data_access_1.default.AuthDB.update({
                    filter: {
                        email: userData.email
                    },
                    update: {
                        lasttime: (0, utils_1.Now)()
                    }
                });
                next();
            });
        }
        catch (err) {
            if (err)
                return res.sendStatus(403);
        }
    }
};
exports.default = authController;
//# sourceMappingURL=index.js.map