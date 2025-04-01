import { Router } from "express";
import create from "./create";
import list from "./list";
import deleteCountdown from "./delete";

const router = Router();

router.use("/create", create);
router.use("/list", list);
router.use("/delete", deleteCountdown);

export default router;
