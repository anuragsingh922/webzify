const express = require('express');
const router = express.Router();

router.use('/get-approved' , require("./v1/theme.routes"));

module.exports = router;