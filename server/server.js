const express = require("express");
const { Client } = require("ssh2");
var cors = require("cors");
var bodyParser = require("body-parser");
// import the file named env.js

// import { SSH_Username,SSH_Password } from "./env.js";

const credentials = require("./env.js");
console.log("Username",credentials);


const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/box", (req, res) => {
  res.send("Hello World!");
});

app.post("/execute-command", async (req, res) => {
  try{
    console.log("req.body",req.body);
  const { command, host, port } = req.body;

  const conn = new Client();
  conn
    .on("ready", () => {
      console.log("Client :: ready");
      conn.exec(command, (err, stream) => {
        if (err) {
          console.log("Error executing command on SSH server.");
          res.status(500).send("Failed to execute command on SSH server.");
          return;
        }
        stream
          .on("close", (code, signal) => {
            console.log(
              "Stream :: close :: code: " + code + ", signal: " + signal
            );
            conn.end();
          })
          .on("data", (data) => {
            console.log("STDOUT: " + data);
            res.send(data);
          })
          .stderr.on("data", (data) => {
            console.log("STDERR: " + data);
          }
        );
      }
      );
    })
    .connect({
      host: host,
      port: 22,
      username: credentials.SSH_USERNAME,
      password: credentials.SSH_PASSWORD
    });
  }catch(err){
    console.log(err)
    res.status(500).send("Something went wrong!");

  }

});



app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
