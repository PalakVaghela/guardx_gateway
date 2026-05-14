const axios = require("axios");

setInterval(async () => {
  try {
    await axios.get("http://localhost:3000/api", {
      headers: {
        "x-api-key": "free-key",
      },
    });

    console.log("request sent");
  } catch (err) {
    console.log(err.response?.data || err.message);
  }
}, 1000);
