"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../models"));
const AuthDB = {
    create: async (data) => {
        const newData = new models_1.default.Auth(data);
        const saveData = await newData.save();
        if (!saveData) {
            throw new Error("AuthDB Database Error");
        }
        return saveData;
    },
    findOne: async ({ filter }) => {
        return models_1.default.Auth.findOne(filter);
    },
    find: async ({ filter }) => {
        return models_1.default.Auth.find(filter);
    },
    update: async ({ filter, update }) => {
        return models_1.default.Auth.findOneAndUpdate(filter, update);
    },
    remove: async ({ filter }) => {
        const res = await models_1.default.Auth.deleteOne(filter);
        return {
            found: res.n,
            deleted: res.deletedCount
        };
    }
};
const authDatas = {
    AuthDB
};
exports.default = authDatas;
//# sourceMappingURL=index.js.map