import { Router } from "express";
import create from "./create";
import list from "./list";

const router = Router();

router.use("/create", create);
router.use("/list", list);

export default router;
