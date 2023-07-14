import { Router } from "express";
import { bookController } from "./book.controller";
import { isVerified } from "../../middlewares/isVerified";

const router: Router = Router();

router.post("/add", isVerified, bookController.addBook);
router.get("/details/:id", bookController.bookDetailsById);
router.delete("/delete/:id", isVerified, bookController.deleteBook)

export { router as BookRoutes}