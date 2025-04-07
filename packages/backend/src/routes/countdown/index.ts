import { Router } from "express";
import create from "./create";
import list from "./list";
import deleteCountdown from "./delete";
import update from "./update";

const router = Router();

router.use("/create", create);
router.use("/list", list);
router.use("/delete", deleteCountdown);
router.use("/update", update);

export default router;
