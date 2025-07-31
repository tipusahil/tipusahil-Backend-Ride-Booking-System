import { Router } from "express";
import { userRouter } from "../modules/user/user.routes";
import { authRouter } from "../modules/auth/auth.route";

 const router: Router = Router();

const modulesRoutes = [
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/auth",
    route: authRouter
  }
];

modulesRoutes.forEach((route1) => {
  router.use(route1.path, route1.route);
});

export default router;