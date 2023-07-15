import { Router } from "express";
import { bookController } from "./book.controller";
import { isVerified } from "../../middlewares/isVerified";

const router: Router = Router();

router.post("/add", isVerified, bookController.addBook);
router.get("/details/:id", bookController.bookDetailsById);
router.delete("/delete/:id", isVerified, bookController.deleteBook)
router.patch("/update/:id", isVerified, bookController.updateBook);
router.get('/all', bookController.getBooks);

export { router as BookRoutes}