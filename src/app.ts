import express, { Application, Request, Response } from "express"
import cors from "cors";

import notFound from "./app/middlewares/notFound.middleware";
import router from "./app/router/router";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler.middleware";
 const app : Application = express();

// -----------------------------------


app.use(express.json());
app.use(cors());

app.use("/api/v1", router);




app.get("/",(req : Request ,res : Response)=>{
res.status(200).json({
    message : "Welcome To Ride Booking System Backend..🎉",
})
});

// ----------------------------start global Error Hanlder -----------------

app.use(globalErrorHandler) // path: "./src/app/middlewares/globalErrorHandler"
// ei global error hanlder ta src/app folder e (middlewares) mane folder niye sei folder e rakte hbe
// ----------------------------end global Error Hanlder -----------------
app.use(notFound);// ei (notFound) ta (app.use(globalErrorHandler)) etar pore app.ts file e use hbe.


export default app;