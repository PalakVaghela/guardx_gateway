const express = require('express');
const router = express.Router();
const storage = require('../storage');

router.get('/metrics', async (req, res) => {
    console.log(express, "expppppp");
    total = await storage.get('metrics:total');
    blocked = await storage.get('metrics:blocked');
    res.json({
        total:  total || 0,
        blocked: blocked || 0
    });
});

module.exports = router;
