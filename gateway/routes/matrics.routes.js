const express = require('express');
const router = express.Router();
const storage = require('../storage');

router.get('/metrics', (req, res) => {
    res.json({
        total: storage.get('metrics:total') || 0,
        blocked: storage.get('metrics:blocked') || 0
    });
});

module.exports = router;
