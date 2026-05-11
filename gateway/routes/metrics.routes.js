const express = require('express');
const router = express.Router();
const storage = require('../storage');

router.get('/metrics/overview', async (req, res) => {
    console.log(express, "expppppp");
    const total = await storage.get('metrics:total');
    const blocked = await storage.get('metrics:blocked');
    res.json({
        total:  total || 0,
        blocked: blocked || 0
    });
});

router.get('/metrics/rps', async (req, res) => {
    const now = Math.floor(Date.now() / 1000);
    let data = [];

    for(let i = 9; i >= 0; i--){
        const second = now - i;
        const key = `metrics:rps:${second}`;
        console.log(key, "KEYSS");

        const value = await storage.get(key);
        console.log(value, "valuueee");

        data.push({
            second,
            requests: value || 0
        })
    }
    res.json(data);
})

module.exports = router;
// it will take current time and last 10 secs before current time, for each sec it will take each sec, and no. req come on each sec.
