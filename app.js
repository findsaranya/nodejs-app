const http = require("http");
const routes = require("./route");

console.log("someText", routes.someText);
const server = http.createServer(routes.handler);

server.listen(1234);
