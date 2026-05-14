const axios = require("axios");

setInterval(async () => {
  console.log("BURST STARTED");

  for (let i = 0; i < 50; i++) {
    try {
      await axios.get("http://localhost:3000/api", {
        headers: {
          "x-api-key": "free-key",
        },
      });
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  }
}, 5000);
