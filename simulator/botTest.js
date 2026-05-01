const axios = require('axios');

const URL = 'http://localhost:3000/api';

async function runBot() {
    console.log("-------BOT IS RUNNING--------")
    for (let i = 0; i < 10; i++) {
        try {
            await axios.get(URL, {
                headers: {
                    'x-api-key': 'free-key'
                }
            });
            console.log(`Request ${i + 1} sent`);
        } catch (err) {
            console.log("Blocked:", err.response?.data || err.message);
        }

        // 🔥 PERFECT INTERVAL (100ms)
        await new Promise(res => setTimeout(res, 100));
    }
}

runBot();
