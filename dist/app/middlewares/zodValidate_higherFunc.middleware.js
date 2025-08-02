"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationRequestHandler_HigherFunc = void 0;
const ValidationRequestHandler_HigherFunc = (zodSchema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log("invalidate body",req.body)
        req.body = yield zodSchema.parseAsync(req.body);
        // console.log("validated body: ",req.body)
        next(); // next function call na korle controller obdi jabena, jodio zodSchema erm addome validate hobe,,tai next() function call korte hobe.
    }
    catch (error) {
        next(error);
    }
});
exports.ValidationRequestHandler_HigherFunc = ValidationRequestHandler_HigherFunc;
// --------------end validatedRequest higher order function --------------
