const axios = require("axios");

setInterval(async () => {
  try {
    await axios.get("http://localhost:3000/api", {
      headers: {
        "x-api-key": "pro-key",
      },
    });

    console.log("ATTACK");
  } catch (err) {
    console.log("BLOCKED:", err.response?.data || err.message);
  }
}, 10);
