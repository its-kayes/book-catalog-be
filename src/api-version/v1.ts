import { Router } from "express";
import { AuthRoutes } from "../module/auth/auth.routes";
import { BookRoutes } from "../module/book/book.routes";
import { ReviewRoutes } from "../module/review/review.routes";

const route: Router = Router();

route.get('/', (req, res) => [
    res.status(200).json({
        message: 'Welcome to the Book Bazar'
    })
])

route.use('/auth', AuthRoutes);
route.use('/book', BookRoutes);
route.use('/review', ReviewRoutes)

export { route as v1}