import express from "express";

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
    res.send('Hi from users service router!');
})

export { router as currentUserRouter };