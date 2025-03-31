import { Router } from "express";
import { HttpError } from "@utils/error";
import auth from "./auth";
import countdown from "./countdown";

const router = Router();

router.use("/api/auth", auth);
router.use("/api/countdown", countdown);

router.get("*", (req, res, next) => {
	next(new HttpError(`Route ${req.method}:${req.path} not found`, 404));
});

export default router;
