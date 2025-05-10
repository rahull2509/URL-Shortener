const express = require("express");

const router = express.Router();
const URL = require("../models/URL");
router.get("/", async(req, res) => {
    const allurls = await URL.find({});

    return res.render("home", {
      urls: allurls,
});
});

module.exports = router;
