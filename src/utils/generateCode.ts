const generateCode = (
  routes: { method: string; endpoint: string; code: string }[]
) => {
  const header = `
  import express from "express";
  
  const router = express.Router();
    `;

  const body = routes
    .map((route) => {
      const method = route.method.toLowerCase();
      return `
  router.${method}("${route.endpoint}", (req, res) => {
    ${route.code}
  });
      `;
    })
    .join("\n");

  const footer = `
  export default router;
    `;

  return `${header}\n${body}\n${footer}`;
};

export default generateCode;
