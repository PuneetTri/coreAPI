import { Request, Response } from "express";
import { Worker } from "worker_threads";
import path from "path";

const executeCode = (
  req: Request,
  res: Response,
  code: string
): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    // Define the path to the worker file
    const workerFilePath = path.resolve(__dirname, "worker.js");

    // Create a new worker thread
    const worker = new Worker(workerFilePath, {
      workerData: { code, reqData: req.body },
    });

    // Handle worker messages
    worker.on("message", (message) => {
      if (message.success) {
        // Send the response back to the client
        res.status(message.response.statusCode).json(message.response.response);
        resolve();
      } else {
        reject(new Error(message.error));
      }
    });

    // Handle worker errors
    worker.on("error", (error) => {
      reject(error);
    });

    // Handle worker exit
    worker.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error("Worker stopped with exit code " + code));
      }
    });

    // Set a timeout to terminate the worker
    setTimeout(() => {
      worker.terminate();
      reject(new Error("Code execution timed out after 10 seconds"));
    }, 10000); // 10 seconds
  });
};

export { executeCode };
