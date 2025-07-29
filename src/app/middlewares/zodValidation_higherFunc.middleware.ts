import { NextFunction, Request, Response } from "express"
import { ZodObject } from "zod"



// --------------start validatedRequest higher order function --------------

export const ValidationRequestHandler_HigherFunc = (zodSchema: ZodObject) =>  async  (req: Request, res: Response, next: NextFunction) => {

try {
    // console.log("invalidate body",req.body)
     req.body =await zodSchema.parseAsync(req.body)
// console.log("validated body: ",req.body)
next()// next function call na korle controller obdi jabena, jodio zodSchema erm addome validate hobe,,tai next() function call korte hobe.
} catch (error) {
    next(error)
}

  }

// --------------end validatedRequest higher order function --------------

