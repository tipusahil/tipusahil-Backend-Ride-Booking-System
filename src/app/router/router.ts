import { Router } from "express";
import { userRouter } from "../modules/user/user.routes";

 const router: Router = Router();

const modulesRoutes = [
  {
    path: "/user",
    route: userRouter,
  },
];

modulesRoutes.forEach((route1) => {
  router.use(route1.path, route1.route);
});

export default router;