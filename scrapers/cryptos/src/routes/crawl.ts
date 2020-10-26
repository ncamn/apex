import { Router } from "express";

import bitcrawl from "../crawl/main";

const router = Router();

router.get("/", (req, res) => {
  bitcrawl.crawl();
  res.sendStatus(200);
});

router.get("/live", (req, res) => {
  bitcrawl.crawlLive();
  res.sendStatus(200);
});

export default router;
