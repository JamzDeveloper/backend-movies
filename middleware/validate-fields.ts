import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
export const validateFields = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    //eliminar archivos creados por error
    if (req.body.image != "undefined" && req.body.image != null) {
      let directory = path.join(
        __dirname,
        "../public/images/" + req.body.image
      );
      fs.unlinkSync(directory);
    }

    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
