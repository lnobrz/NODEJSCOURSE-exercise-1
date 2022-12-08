const http = require("http");

const server = http.createServer((req, res) => {
  const method = req.method;

  if (req.url === "/") {
    res.write("<html>");
    res.write("<head><title>Homepage</title></head>");
    res.write("<body>");
    res.write("<h1>Hello world</h1>");
    res.write(
      "<form action='/create-user' method='POST'><input type='text' name='name'/><button type='submit'></button></form>"
    );
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }

  if (req.url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString().replace("=", " ");
      console.log(parsedBody);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }

  if (req.url === "/users") {
    res.write("<html>");
    res.write("<head><title>Homepage</title></head>");
    res.write("<body>");
    res.write("<ul>");
    res.write("<li>User 1</li><li>User 2</li><li>User 3</li><li>User 4</li>");
    res.write("</ul>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }
});

server.listen(3000);
