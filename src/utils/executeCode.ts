import { Request, Response } from "express";

const executeCode = (req: Request, res: Response, code: string) => {
  return new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("Code execution timed out after 10 seconds"));
    }, 10000); // 10 seconds

    try {
      // Create a new function from the code and execute it
      const func = new Function("req", "res", code);
      func(req, res);

      // If the code executes successfully, clear the timeout and resolve
      clearTimeout(timer);
      resolve();
    } catch (error) {
      // If there's an error in code execution, clear the timeout and reject with the error
      clearTimeout(timer);
      reject(error);
    }
  });
};

export { executeCode };
