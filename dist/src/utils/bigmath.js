"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatUnit = exports.parseUnit = exports.bdiv = exports.bmul = exports.bsub = exports.badd = void 0;
const ethers_1 = require("ethers");
const badd = (a, b) => {
    let n1, n2;
    if (typeof a === "string" || typeof a === "number") {
        n1 = ethers_1.BigNumber.from(Number(a).toFixed(0));
    }
    else
        n1 = a;
    if (typeof b === "string" || typeof b === "number") {
        n2 = ethers_1.BigNumber.from(Number(b).toFixed(0));
    }
    else
        n2 = b;
    return n1.add(n2);
};
exports.badd = badd;
const bsub = (a, b) => {
    let n1, n2;
    if (typeof a === "string" || typeof a === "number") {
        n1 = ethers_1.BigNumber.from(Number(a).toFixed(0));
    }
    else
        n1 = a;
    if (typeof b === "string" || typeof b === "number") {
        n2 = ethers_1.BigNumber.from(Number(b).toFixed(0));
    }
    else
        n2 = b;
    return n1.sub(n2);
};
exports.bsub = bsub;
const bmul = (a, b) => {
    let n1, n2;
    if (typeof a === "string" || typeof a === "number") {
        n1 = ethers_1.BigNumber.from(Number(a).toFixed(0));
    }
    else
        n1 = a;
    if (typeof b === "string" || typeof b === "number") {
        n2 = ethers_1.BigNumber.from(Number(b).toFixed(0));
    }
    else
        n2 = b;
    return n1.mul(n2);
};
exports.bmul = bmul;
const bdiv = (a, b) => {
    let n1, n2;
    if (typeof a === "string" || typeof a === "number") {
        n1 = ethers_1.BigNumber.from(Number(a).toFixed(0));
    }
    else
        n1 = a;
    if (typeof b === "string" || typeof b === "number") {
        n2 = ethers_1.BigNumber.from(Number(b).toFixed(0));
    }
    else
        n2 = b;
    return n1.div(n2);
};
exports.bdiv = bdiv;
const parseUnit = (v, unit) => {
    if (typeof v === "number" || typeof v === "string")
        v = Number(v).toFixed(unit);
    else if (typeof v !== "string")
        v = v.toString();
    return ethers_1.ethers.utils.parseUnits(v, unit);
};
exports.parseUnit = parseUnit;
const formatUnit = (v, unit) => {
    if (typeof v === "number" || typeof v === "string")
        v = ethers_1.BigNumber.from(v).toString();
    return ethers_1.ethers.utils.formatUnits(v, unit);
};
exports.formatUnit = formatUnit;
//# sourceMappingURL=bigmath.js.map