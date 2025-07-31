// types/express/index.d.ts
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & {
        userId: string;
        role: string;
      };
    }
  }
}
// --------------------(tsconfig.json) file e (typeRoots) eta find kore ei array ta bosate hobe, ortat notun j ekta type hoise eta tsconfig.josn file k janate hobe.
  // "typeRoots": ["./node_modules/@types", "./types"],    



// user access token ta header theke niye ,verify hoye ei req.user e set hoye jabe ortat (express) er (Request) e set hoye jabe, jeheto express e req.body ,req.params eshob ase but req.user nai tai setar jonno ei type ta declare kora holo express e .


// -------------------- 2.jodi uporer niome tsconfig.json file kaj na kore tahole niser niome korte hbe.
// -----------------tsconfig.json file er ekdom last } ei closing curly bracket ta kete eta code bosai then seta } dite hbe, tahole kaj korb.e

  // ,
  // "include": ["./src/app/interfaces/index.d.ts"] // eta kora drkr jokon (req.user) er jonno alada kore globally express er (request) er jonno type define korar porew jodi (req.user) likai error dei, tokon, but error na dile eta comment korei rakte hbe.
// } 

// -----------------