import { Router } from "express";

const route: Router = Router();

route.get('/', (req, res) => [
    res.status(200).json({
        message: 'Welcome to the Book Bazar'
    })
])

export { route as v1}