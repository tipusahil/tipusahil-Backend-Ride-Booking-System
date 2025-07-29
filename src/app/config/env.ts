import dotenv from "dotenv";


dotenv.config();

interface I_envConfig {
    PORT:string ,
    DATABASE_URL : string,
    NODE_ENV : "development" | "production",
    BCRYPT_SALT_ROUND : string,
    SUPER_ADMIN_EMAIL : string,
    SUPER_ADMIN_PASSWORD: string,
    JWT_ACCESS_SECRET_SIGNATURE : string,
    JWT_ACCESS_EXPIRES : string,
    JWT_REFRESH_SECRET : string,
    JWT_REFRESH_EXPIRES : string,
    GOOGLE_CLIENT_SECRET : string,
    GOOGLE_CLIENT_ID : string,
    GOOGLE_CALLBACK_URL : string,
    FRONTEND_URL : string,
    EXPRESS_SESSION_SECRET : string,
    // SUPER_ADMIN_FIRST_NAME : string,
    // SUPER_ADMIN_LAST_NAME  : string,
}

// ----envLoader function start here ------
const loadEnvVariables = () : I_envConfig =>{

const requiredEnvVariables : string[] = ["PORT" , "DATABASE_URL" , "NODE_ENV" , "JWT_ACCESS_SECRET_SIGNATURE" , "JWT_ACCESS_EXPIRES" , "BCRYPT_SALT_ROUND", "SUPER_ADMIN_EMAIL", "SUPER_ADMIN_PASSWORD", "JWT_REFRESH_SECRET", "JWT_REFRESH_EXPIRES", "GOOGLE_CLIENT_SECRET", "GOOGLE_CLIENT_ID",  "GOOGLE_CALLBACK_URL",  "FRONTEND_URL", "EXPRESS_SESSION_SECRET"];
// ----

requiredEnvVariables.forEach( key => {
    if(!process.env[key]) {
        throw new Error(`Missing the require Environment variable ${key}`)
    }
})

// ----

    return  {
PORT: process.env.PORT as string,
//   DATABASE_URL: process.env.DATABASE_URL as string, //otaba niser line ta ,but non-null assertion disable korte hbe,nahoi eslint error dibe.

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
DATABASE_URL: process.env.DATABASE_URL ! ,
NODE_ENV: process.env.NODE_ENV as "development" | "production" ,

BCRYPT_SALT_ROUND : process.env.BCRYPT_SALT_ROUND as string,

SUPER_ADMIN_EMAIL : process.env.SUPER_ADMIN_EMAIL as string,
SUPER_ADMIN_PASSWORD : process.env.SUPER_ADMIN_PASSWORD as string,

JWT_ACCESS_SECRET_SIGNATURE : process.env.JWT_ACCESS_SECRET_SIGNATURE as string,
JWT_ACCESS_EXPIRES : process.env.JWT_ACCESS_EXPIRES as string,
JWT_REFRESH_SECRET : process.env.JWT_REFRESH_SECRET as string,
JWT_REFRESH_EXPIRES : process.env.JWT_REFRESH_EXPIRES as string,

GOOGLE_CLIENT_SECRET : process.env.GOOGLE_CLIENT_SECRET as string,
GOOGLE_CLIENT_ID : process.env.GOOGLE_CLIENT_ID as string,
GOOGLE_CALLBACK_URL :process.env.GOOGLE_CALLBACK_URL as string,
FRONTEND_URL : process.env.FRONTEND_URL as string,
EXPRESS_SESSION_SECRET : process.env.EXPRESS_SESSION_SECRET as string,
// SUPER_ADMIN_FIRST_NAME : process.env.SUPER_ADMIN_FIRST_NAME as string,
// SUPER_ADMIN_LAST_NAME : process.env.SUPER_ADMIN_LAST_NAME as string,
    
};

// --
} 
// ----envLoader function end here ------

export const envVars = loadEnvVariables();
