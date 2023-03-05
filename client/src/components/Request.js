import axios from "axios";
import React, { useState } from "react";

function Request() {
  const [command, setCommand] = useState();
  const [host] = useState();
  const [port] = useState("22");
  const [results, setResults] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCommand("");

    await axios
      .post("api/execute-command", {
        command: command,
        host: host,
        port: port,
      })
      .then((response) => {
        console.log(response);
        setResults(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>

      <h1>Request</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Command:
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {/* <h1>{results}</h1> */}
      {/* write it better */}
      <pre>{results}</pre>
    </div>
  );
}

export default Request;
