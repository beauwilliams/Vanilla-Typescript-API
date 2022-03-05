import http, { IncomingMessage, ServerResponse } from "http";
// import task list controllers
import { getTasks, addTask, updateTask, deleteTask } from "./controllers/Task";

const host = "localhost";
const port = 3000;

const vanillaHttpserver = http.createServer((req, res) => {
  // get tasks
  if (req.method == "GET" && req.url == "/api/tasks") {
    return getTasks(req, res);
  }

  // Creating a task
  if (req.method == "POST" && req.url == "/api/tasks") {
    return addTask(req, res);
  }

  // Updating a task
  if (req.method == "PUT" && req.url == "/api/tasks") {
    return updateTask(req, res);
  }

  // Deleting a task
  if (req.method == "DELETE" && req.url == "/api/tasks") {
    return deleteTask(req, res);
  }

  index(res);
});


  //NOTE: crappy way to return index.html for this example project
const index = (res: ServerResponse) => {
  const fs = require("fs").promises;
  // NOTE: Load index file only once
  fs.readFile(__dirname + "/public/index.html")
  .then((contents: any) => {
  res.setHeader("Content-Type", "text/html");
  res.writeHead(200);
  res.end(contents)
  })
  .catch((err: any) => {
  console.log(err);

    });
};

vanillaHttpserver.listen(port, host, () => {
  console.log("Server started. Good job kiddo.");
  console.log(`Server is running on http://${host}:${port}`);
});
