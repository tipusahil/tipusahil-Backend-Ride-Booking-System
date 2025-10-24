import cors from "cors";
import express, { Application, Request, Response } from "express";

import cookieParser from "cookie-parser";
import { envVars } from "./app/config/env";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler.middleware";
import notFound from "./app/middlewares/notFound.middleware";
import router from "./app/router/router";
 const app : Application = express();

// -----------------------------------
app.use(cookieParser()); // এটা না থাকলে req.cookies = undefined dibe,tai kovi kovi kovi important eta, nahoi (req.cookies.accessToken) evabe access krote caile undefined dibe.. tai ei line ta  ei line -> (app.use(express.json());) er upore dite hobe, nahoi kaj korbena, ortat sobar upore 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
    origin:envVars.FRONTEND_URL,
    credentials:true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // প্রয়োজনীয় মেথড যোগ করুন
    allowedHeaders: ['Content-Type', 'Authorization'], // প্রয়োজনীয় হেডার যোগ করুন
    
   preflightContinue: false,
    // optionsSuccessStatus: 204,
}));

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