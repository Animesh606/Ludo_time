import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.json({ message: "Welcome to the Ludo Game API!" });
});

export default router;
