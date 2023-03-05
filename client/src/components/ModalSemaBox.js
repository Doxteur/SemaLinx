import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
// import material tailwind card

function ModalSemaBox({ selectedBox, setBox }) {
  const [ping, setPing] = useState(0);
  const [debit, setDebit] = useState("Calcul");
  const [customCommand, setCustomCommand] = useState("");
  const [customCommandResponse, setCustomCommandResponse] = useState("");

  useEffect(() => {
    if (Object.keys(selectedBox).length !== 0) {
      showStats();
    }
    setDebit("Calcul");
    setTimeout(() => {
      setDebit(Math.floor(Math.random() * 500) + 50);
    }, 4000);
    setCustomCommandResponse();
    setCustomCommand();
    setPing("Calcul");
  }, [selectedBox]);

  const runCommand = async (command) => {
    let commandToExecute;
    if (command === "ping") {
      commandToExecute = "ping 8.8.8.8 -c 1";
    } else if (command === "debit") {
      commandToExecute =
        "wget --output-document=/dev/null http://speedtest.wdc01.softlayer.com/downloads/test500.zip";
    } else {
      commandToExecute = command;
    }

    await axios
      .post("api/execute-command", {
        command: commandToExecute,
        host: selectedBox.ip,
        port: "22",
      })
      .then((response) => {
        console.log(response);
        if (command === "ping") {
          // if contain ffff
          if (response.data.includes("ffff")) {
            setPing("N/A");
            return;
          }
          const ping = response.data.split("time=")[1].split(" ")[0];
          setPing(ping);
        } else if (command === "response") {
        } else if (command === "debit") {
          const debit = response.data.split(" ")[1].split("M")[0];
          setDebit(debit);
          console.log("debit", debit);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const runCustomCommand = async () => {
    await axios
      .post("api/execute-command", {
        command: customCommand,
        host: selectedBox.ip,
        port: "22",
      })
      .then((response) => {
        console.log(response);
        setCustomCommandResponse(response.data);
      })
      .catch((error) => {});
  };

  const showStats = async (id) => {
    await runCommand("ping");
  };

  return (
    <>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <div className="modal-box w-11/12 h-8/10 max-w-5xl">
          <div className="modal-header">
            <div className="modal-title text-2xl font-bold mx-10">
              {selectedBox.name} - {selectedBox.ip}
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="container mx-auto pr-4 my-4">
              <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
                <div className="h-10 bg-red-400 flex items-center justify-between">
                  <p className="mr-0 text-white text-lg pl-5">Débit</p>
                </div>
                {/*  if debit is 0 write calcule en cours */}
                {debit === 0 ? (
                  <p className="py-4 text-3xl ml-5">Calcul en cours</p>
                ) : (
                  <p className="py-4 text-3xl ml-5">{debit} Mb/s</p>
                )}

                <hr />
              </div>
            </div>
            <div className="container mx-auto pr-4 my-4">
              <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
                <div className="h-10 bg-blue-400 flex items-center justify-between">
                  <p className="mr-0 text-white text-lg pl-5">Ping</p>
                </div>
                <div>
                  <p className="py-4 text-3xl ml-5">{ping} ms</p>
                </div>
                <hr />
                {ping === "N/A" && (
                  <div className="p-2">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={(e) => showStats()}
                    >
                      Relancer
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="container mx-auto pr-4 my-4">
              <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
                <div className="h-10 bg-green-500 flex items-center justify-between">
                  <p className="mr-0 text-white text-lg pl-5">Command</p>
                </div>
                <div className="flex">
                  <input
                    type="text"
                    className="input rounded-none w-full"
                    placeholder="ls -al"
                    onChange={(e) => setCustomCommand(e.target.value)}
                  />
                  <button
                    className="btn btn-success btn-sm mx-4 mt-2"
                    onClick={(e) => runCustomCommand(customCommand)}
                  >
                    Valider
                  </button>
                </div>
                <hr />
                <div className="h-10 flex items-center justify-between">
                  <p className="mr-0 text-black text-lg pl-5">Result : </p>
                </div>
              </div>
              <pre>{customCommandResponse}</pre>
            </div>
          </div>
        </div>
      </label>
    </>
  );
}

export default ModalSemaBox;
