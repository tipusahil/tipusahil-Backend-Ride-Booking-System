"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const notFound_middleware_1 = __importDefault(require("./app/middlewares/notFound.middleware"));
const router_1 = __importDefault(require("./app/router/router"));
const app = (0, express_1.default)();
// -----------------------------------
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/v1", router_1.default);
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome To Ride Booking System Backend..🎉",
    });
});
// ----------------------------start global Error Hanlder -----------------
// app.use(globalErrorHandler) // path: "./src/app/middlewares/globalErrorHandler"
// ei global error hanlder ta src/app folder e (middlewares) mane folder niye sei folder e rakte hbe
// ----------------------------end global Error Hanlder -----------------
app.use(notFound_middleware_1.default); // ei (notFound) ta (app.use(globalErrorHandler)) etar pore app.ts file e use hbe.
exports.default = app;
