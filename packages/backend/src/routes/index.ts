import { Router } from "express";
import { HttpError } from "@utils/error";
import auth from "./auth";

const router = Router();

router.use("/api/auth", auth);

router.get("*", (req, res, next) => {
	next(new HttpError(`Route ${req.method}:${req.path} not found`, 404));
});

export default router;
