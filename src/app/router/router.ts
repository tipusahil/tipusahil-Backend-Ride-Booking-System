import { Router } from "express";
import { userRouter } from "../modules/user/user.routes";
import { authRouter } from "../modules/auth/auth.route";
import { rideRouter } from "../modules/ride/ride.routes";
import { driverRouter } from "../modules/driver/driver.routes";

 const router: Router = Router();

const modulesRoutes = [
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/auth",
    route: authRouter
  },
  {
    path: "/rides",
    route : rideRouter
  },
  {
    path: "/drivers",
    route : driverRouter
  }
];

modulesRoutes.forEach((route1) => {
  router.use(route1.path, route1.route);
});

export default router;