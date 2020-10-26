import { Router } from "express";

import all from "./all";
import crawl from "./crawl";
import exchanges from "./exchanges";

const router = Router();

router.get("/", (req, res) => {
  res.sendStatus(200);
});

router.use("/all", all);
router.use("/crawl", crawl);
router.use("/exchanges", exchanges);

export default router;
