import { Router } from "express";
import { AuthRoutes } from "../module/auth/auth.routes";
import { BookRoutes } from "../module/book/book.routes";

const route: Router = Router();

route.get('/', (req, res) => [
    res.status(200).json({
        message: 'Welcome to the Book Bazar'
    })
])

route.use('/auth', AuthRoutes);
route.use('/book', BookRoutes);

export { route as v1}