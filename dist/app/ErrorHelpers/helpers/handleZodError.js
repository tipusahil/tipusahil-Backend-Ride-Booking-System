"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = void 0;
const handleZodError = (err) => {
    const errorSourcesArray = [];
    const issues = err.issues;
    issues.forEach((issue) => errorSourcesArray.push({
        path: issue.path[issue.path.length - 1], // path array tar length theke -1 korar maddome  ekdom last value ta newa hoise.
        // path : "nickname" inside lastName inside name
        //   path : issue.path.reverse().join(" inside ");
        //   path : issue.path.length > 1 && issue.path.reverse().join(" inside ");
        // issue.path.join('.')
        message: issue.message,
    }));
    //   console.log("err.issue holo --------", err.issues, "---------");
    return {
        errorSourcesArray,
        statusCode: 400,
        message: "zod error",
        issues: issues
    };
};
exports.handleZodError = handleZodError;
