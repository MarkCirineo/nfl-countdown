import { Router } from "express";
import { isAdmin } from "@middleware/auth";
import { HttpError } from "@utils/error";
import db from "@db";

const router = Router();

router.delete("/", isAdmin, async (req, res, next) => {
	try {
		const { id } = req.body;

		if (!id) {
			return next(new HttpError("Id is required", 400));
		}

		const deleted = await db.deleteFrom("countdowns").where("id", "=", id).executeTakeFirst();

		if (deleted.numDeletedRows === BigInt(0)) {
			return next(new HttpError("Countdown not found", 404));
		}

		return res.status(200).send({ message: "Countdown deleted" });
	} catch (error) {
		console.error(error);
		return next(new HttpError("Failed to delete countdown", 500));
	}
});

export default router;
