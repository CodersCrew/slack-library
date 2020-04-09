const localtunnel = require("localtunnel");
const dotenv = require("dotenv");

dotenv.config();

if (process.env.NODE_ENV !== "production") {
  (async () => {
    await localtunnel({
      port: 3000,
      host: process.env.TUNNEL_HOST,
      subdomain: process.env.TUNNEL_SUBDOMAIN,
    });

    console.log("⚡️ Tunnel is running!");
  })();
}
