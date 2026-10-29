const http = require("http");

const server = http.createServer((req, res) => {
  const { url } = req;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html><head><title>Assignment</title></head>");
    res.write("<body><h1>Welcome to Assignement one</h1>");
    res.write(
      "<form method='POST' action='/create-user'><input type='text' name='username'/><input type='submit'/></form>",
    );
    return res.end();
  } else if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html><head><title>Users List</title></head>");
    res.write("<body><h1>Users List</h1>");
    res.write(
      "<ul><li>saranya</li><li>Ramkumar</li><li>Soumya</li><li>Tanesshashri</li></ul>",
    );
    res.write("</body></html");
    return res.end();
  } else if (url === "/create-user") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
      console.log("chunk", chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split("=")[1];
      console.log(username);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      res.end();
    });
  }
});

server.listen(3000);
