const crypto = require("crypto")

const SECRET = crypto.randomBytes(16).toString("hex")


console.log(SECRET);
// Typing "node app.js" in terminal to get the code SECRET