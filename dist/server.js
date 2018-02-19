"use strict";
const app = require("./app");
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || "development";
const server = app.listen(port, () => {
    console.log(("  App is running at http://localhost:%d in %s mode"), port, env);
    console.log("  Press CTRL-C to stop\n");
});
module.exports = server;
//# sourceMappingURL=server.js.map