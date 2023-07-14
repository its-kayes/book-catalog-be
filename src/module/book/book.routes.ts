import { Router } from "express";
import { bookController } from "./book.controller";
import { isVerified } from "../../middlewares/isVerified";

const router: Router = Router();

router.post("/add", isVerified, bookController.addBook)

export { router as BookRoutes}