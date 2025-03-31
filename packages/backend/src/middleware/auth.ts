import { NextFunction, Request, Response } from "express";
import { HttpError } from "@utils/error";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
	if (req.session.user && req.session.user.role === "admin") {
		return next();
	} else {
		return next(new HttpError("Access denied. Admin privileges required.", 403));
	}
};
