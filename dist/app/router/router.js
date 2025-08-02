"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = require("../modules/user/user.routes");
const auth_route_1 = require("../modules/auth/auth.route");
const ride_routes_1 = require("../modules/ride/ride.routes");
const driver_routes_1 = require("../modules/driver/driver.routes");
const router = (0, express_1.Router)();
const modulesRoutes = [
    {
        path: "/users",
        route: user_routes_1.userRouter,
    },
    {
        path: "/auth",
        route: auth_route_1.authRouter
    },
    {
        path: "/rides",
        route: ride_routes_1.rideRouter
    },
    {
        path: "/drivers",
        route: driver_routes_1.driverRouter
    }
];
modulesRoutes.forEach((route1) => {
    router.use(route1.path, route1.route);
});
exports.default = router;
