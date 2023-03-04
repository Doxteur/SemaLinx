import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import axios from "axios";
import ModalSemaBox from "./ModalSemaBox";
import { useState } from "react";

export default function PageVisitsCard({ box, setBox }) {
  const [selectedBox, setSelectedBox] = useState({});

  const shutDown = (id) => {
    const boxCopy = [...box];
    const boxIndex = boxCopy.findIndex((box) => box.id === id);
    const state = boxCopy[boxIndex].status;
    state === "Online"
      ? (boxCopy[boxIndex].status = "Offline")
      : (boxCopy[boxIndex].status = "Online");
    setBox(boxCopy);
    runCommand(
      boxCopy[boxIndex].ip,
      state === "Online" ? "shutdown -h now" : ""
    );
  };

  const runCommand = (ip, command) => {
    axios
      .post("api/execute-command", {
        command: command,
        host: ip,
        port: 22,
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <Card>
      <CardHeader color="blue" contentPosition="none">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-white text-2xl">Mes Box</h2>
          <Button
            color="transparent"
            buttonType="link"
            size="lg"
            style={{ padding: 0 }}
          >
            Voir plus
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <div className="overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  ID
                </th>
                <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Nom
                </th>
                <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  IP
                </th>
                <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Status
                </th>
                <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Infos
                </th>
              </tr>
            </thead>
            <tbody>
              {box.map((box) => (
                <tr key={box.id}>
                  <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                    {box.id}
                  </th>
                  <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                    {box.name}
                  </td>
                  <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                    {box.ip}
                  </td>
                  <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                    <span
                      className={`px-2 py-1 text-xs font-bold leading-none rounded-md hover:cursor-pointer ${
                        box.status === "Online"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                      onClick={(e) => shutDown(box.id)}
                    >
                      {box.status}
                    </span>
                  </td>
                  {box.status === "Online" && (
                    <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                      <label
                        htmlFor="my-modal-4"
                        className="hover:cursor-pointer btn btn-xs btn-secondary"
                        onClick={(e) => setSelectedBox(box)}
                      >
                        plus d'infos
                      </label>
                    </td>
                  )}
                </tr>
              ))}
              <ModalSemaBox selectedBox={selectedBox} setBox={setBox} />
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
}
