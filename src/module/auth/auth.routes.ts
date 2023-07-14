import { Router } from "express";
import { AuthController } from "./auth.controller";

const router: Router = Router()

router.post('/signup', AuthController.signup)
router.post('/signin', AuthController.signin)

export { router as AuthRoutes }