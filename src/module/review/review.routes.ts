import { Router } from "express";
import { reviewController } from "./review.controller";

const router: Router = Router();

router.post("/give-review", reviewController.giveReview);
router.get('/reviews-for-book', reviewController.getReviewByBookName)

export { router as ReviewRoutes };
