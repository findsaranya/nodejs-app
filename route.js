const fs = require("fs");

// console.log("request",req);
// console.log("**************",req.headers,req.url,req.method)
const requestHandler = (req, res) => {
  const { url, method } = req;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Enter the input</title></head>");
    res.write(
      "<body><form method='POST' action='/message'><input type='text' name='message'/><button type='submit'>Send</button></form></body>",
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
      console.log("chunk", chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log("Parsed", parsedBody);
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, () => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title></title></head>");
  res.write("<body><h1>Hello from Nodejs Server</h1></body>");
  res.end();
  //after that no writing happens otherwise results in error
  //process.exit();
};

//module.exports = requestHandler;

// module.exports = {
//   handler: requestHandler,
//   someText: "example",
// };

// module.exports.handler = requestHandler;
// module.exports.someText = "ramkumar";

//short hand support provided by node js
exports.handler = requestHandler;
exports.someText = "Taneesha";
