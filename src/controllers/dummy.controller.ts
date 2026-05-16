import { Request, Response } from "express";

export default {
  dummy(req: Request, res: Response) {
    res.status(200).json({
      message: "Response is working on status 200",
      data: "Good",
    });
  },
};
