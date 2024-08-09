
  import express from "express";
  
  const router = express.Router();
    

  router.post("/", (req, res) => {
    return res.status(200).json({message: 'Hello'})
  });
      

  router.post("/hey", (req, res) => {
    return res.status(200).json({message: 'bye'})
  });
      

  router.post("/bye", (req, res) => {
    return res.status(200).json({message: 'hyyyy'})
  });
      

  router.post("/abc", (req, res) => {
    return res.status(200).json({message: 'xyz'})
  });
      

  router.post("/xxx", (req, res) => {
    return res.status(200).json({message: 'naughty america'})
  });
      

  export default router;
    