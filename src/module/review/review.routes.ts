import { Router } from "express";
import { reviewController } from "./review.controller";

const router: Router = Router();

router.post("/give-review", reviewController.giveReview);

export { router as ReviewRoutes}