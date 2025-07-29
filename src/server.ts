// import http from "http"; useCase =  http.Server
import { Server } from "http";
import mongoose from "mongoose";
import { envVars } from "./app/config/env";
import app from "./app";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DATABASE_URL);
    // await use korte .then().catch eshob use kora jaina, karon await sei kaj ta kore fele.
    console.log("🟢 MongoDB connected");

    //------server listening kora, age db te connect kora then server listen korte hbe------
    server = app.listen(envVars.PORT, () => {
      console.log(`server listening to port ${envVars.PORT} ✅`);
    });
  } catch (error) {
    console.log(error);
  }
};
// -------------------------------------------------

// ----server and super Admin func calling...
(async () => {
  await startServer();
  // await seedSuperAdmin();
})();

// -------------------------------------------------

/*    -----------------------------------------------------------------
## 🔐 সার্ভারে ৩ ধরনের Error আসতে পারে যেগুলোর জন্য আলাদাভাবে Error Handling করতে হয় —
    ✅ যেন সার্ভার হঠাৎ করে Crash না করে, বরং Softly বন্ধ হয়ে যায়:
    
    ১. ❗Unhandled Rejection Error:
        → এটি সাধারনত Promises-এর ক্ষেত্রে ঘটে, যেখানে কোনো `.catch()` block দেওয়া হয়নি।
        → যেমন: কোনো async function বা API কলের error যদি try-catch ছাড়া ফেলে দেওয়া হয়।
        → এই ধরণের error গুলো development environment-এ ধরা পড়ে না সবসময়।
        → তাই আমরা process.on("unhandledRejection") দিয়ে এগুলো ধরতে পারি।
        → এর মাধ্যমে error ধরার পর লগ করা যায় এবং server কে graceful ভাবে shutdown করা যায়।
    
    ২. ❗Uncaught Exception Error:
        → এটি হচ্ছে synchronous কোডে এমন কোনো Error যেটা আমরা try-catch দিয়ে ধরিনি।
        → যেমন: undefined function call, টাইপ error, ইত্যাদি।
        → এটি সরাসরি প্রোগ্রাম থামিয়ে দিতে পারে, তাই এটাকে process.on("uncaughtException") দিয়ে ধরতে হয়।
    
    ৩. ❗Signal Termination (SIGTERM):
        → যখন সার্ভারকে বাইরে থেকে forcefully বন্ধ করা হয় (যেমন: `kill`, `pm2 stop`, Docker থেকে kill) তখন SIGTERM সিগনাল পাঠানো হয়।
        → আমরা চাইলে এই signal ধরতে পারি যাতে সার্ভার বন্ধ হওয়ার আগে DB সংযোগ বা লগিং-এর কাজ সুষ্ঠুভাবে শেষ করা যায়।
        → এতে সার্ভার graceful shutdown দিতে পারে, abrupt না হয়ে।

    ✅ সবগুলোর উদ্দেশ্য হচ্ছে: 
    👉 সার্ভার যেন হঠাৎ করে বন্ধ না হয়, বরং ক্লায়েন্ট ও ডেভেলপার উভয়ের জন্য clear message/log দিয়ে বন্ধ হয়।
    -----------------------------------------------------------------
*/
// 1.unhandledRejection------
process.on("unhandledRejection", (err) => {
  console.log(
    `unHandle Rejection dedacted. Server Shutting Down... \n error is:${err}`
  );

  if (server) {
    server.close(() => {
      // server ta amr actual app er server,jeta ami banaici.seta close hobe.
      process.exit(1); // proccess ta node.js er server
    });
  } else {
    process.exit(1);
  }
});

// 2. uncaughtException------
process.on("uncaughtException", (err) => {
  console.log(
    `uncaught Exception Dedected. Server Shutting Down... \n error is:${err}`
  );

  if (server) {

    server.close(() => {
      process.exit(1);
    });

  } else {
    process.exit(1);
  }
});

// 3. SIGTERM ---- (signaal termination (sigterm)) jeta google/vercel/azure/cloud theke asle hoi >  --------
process.on("SIGTERM", () =>{
    console.log(`SIGTERM Signal Recieved... Server Shutting Down... `);

    if(server){
        server.close(()=>{
            process.exit(1);
        })
    };
    process.exit(1);// else hole  eta hobe.

})


// 4. SIGINT -----(sigint) signal nije theke intialize kore server e signal diye server off kora)jmn: 
process.on("SIGINT", ()=>{
    console.log(` (ctrl+c) pressed, So, \n SIGINT Signal Recieved... Server Shutting Down...`);

    if(server) {
        server.close(() =>{
            process.exit(1);
        })
    } 
    process.exit(1);
})