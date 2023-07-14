import { Router } from "express";
import { AuthRoutes } from "../module/auth/auth.routes";

const route: Router = Router();

route.get('/', (req, res) => [
    res.status(200).json({
        message: 'Welcome to the Book Bazar'
    })
])

route.use('/auth', AuthRoutes);

export { route as v1}