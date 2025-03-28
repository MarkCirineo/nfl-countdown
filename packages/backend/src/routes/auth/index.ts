import { Router } from "express";
import register from "./register";
import login from "./login";
// import logout from "./logout";

const router = Router();

router.use("/register", register);
router.use("/login", login);
// router.use("/logout", logout);

export default router;
