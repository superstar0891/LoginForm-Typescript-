"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// External Modules
const Routes_1 = require("./Routes");
const config_json_1 = __importDefault(require("../config.json"));
const setlog_1 = __importDefault(require("./utils/setlog"));
// Get router
const router = express_1.default.Router();
const app = (0, express_1.default)();
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
const connectDatabase = async (mongoUrl) => {
    try {
        const options = {
            autoCreate: true,
            keepAlive: true,
            retryReads: true,
        };
        mongoose_1.default.set("strictQuery", true);
        const result = await mongoose_1.default.connect(mongoUrl, options);
        if (result) {
            (0, setlog_1.default)("MongoDB connected");
        }
    }
    catch (err) {
        (0, setlog_1.default)("ConnectDatabase", err);
    }
};
// Middleware
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({ origin: "*", methods: ["POST", "GET"] }));
app.use(limiter);
app.use(express_1.default.json());
// Frontend Render
if (!config_json_1.default.debug) {
    app.use(express_1.default.static(__dirname + "/build"));
    app.get("/*", function (req, res) {
        res.sendFile(__dirname + "/build/index.html", function (err) {
            if (err) {
                res.status(500).send(err);
            }
        });
    });
}
// API Router
(0, Routes_1.Routes)(router);
app.use("/api", router);
connectDatabase(config_json_1.default.DATABASE).then(() => {
    app.listen(config_json_1.default.PORT, () => {
        (0, setlog_1.default)(`Server listening on ${config_json_1.default.PORT} port`);
    });
}).catch((err) => {
    (0, setlog_1.default)(err);
});
exports.default = app;
//# sourceMappingURL=main.js.map