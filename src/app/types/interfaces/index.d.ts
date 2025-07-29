
import { JwtPayload } from 'jsonwebtoken';


declare global {
    namespace Express {
        interface Request{
    user : JwtPayload 
        }
    }
}
// user access token ta header theke niye ,verify hoye ei req.user e set hoye jabe ortat (express) er (Request) e set hoye jabe, jeheto express e req.body ,req.params eshob ase but req.user nai tai setar jonno ei type ta declare kora holo express e .