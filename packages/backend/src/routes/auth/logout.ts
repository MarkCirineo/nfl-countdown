import { HttpError } from "@utils/error";
import { Router } from "express";

const router = Router();

router.post("/", async (req, res, next) => {
	try {
		req.session.destroy((err) => {
			if (err) {
				return next(new HttpError("Logout failed", 500));
			}
			res.clearCookie("connect.sid");
			return res.status(200).send({ message: "Logout successful" });
		});
	} catch (error) {
		return next(new HttpError("Logout failed", 500));
	}
});

export default router;
