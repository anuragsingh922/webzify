const express = require('express');
const router = express.Router();

const { getTheme, postTheme, deleteTheme, updateTheme } = require("../../controller/theme.contoller");

router.post("/", getTheme);
router.post("/new-image", postTheme);
router.patch("/new-image", updateTheme);
router.delete("/", deleteTheme);

module.exports = router;