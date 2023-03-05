import StatusCard from "components/StatusCard";
import PageVisitsCard from "components/PageVisitsCard";
import Sidebar from "components/Sidebar";
import {useState } from "react";
import {semaboxList} from "../semaboxlist";

export default function Dashboard() {
  const [box, setBox] = useState(semaboxList);


  return (
    <>
      <Sidebar />
      <div className="md:ml-64">
        <div className="bg-light-blue-500 px-3 md:px-8 h-40" />

        <div className="px-3 md:px-8 -mt-10">
          <div className="container mx-auto max-w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mb-4">
              <StatusCard
                color="pink"
                icon="token"
                title="SemaBox Total"
                amount={box.length.toString()}
                percentage="2"
                percentageIcon="arrow_upward"
                percentageColor="green"
                date="Depuis le dernier mois"
              />
              <StatusCard
                color="orange"
                icon="hide_source"
                title="Semabox Eteintes"
                amount={box
                  .filter((box) => box.status === "Offline")
                  .length.toString()}
              />
              <StatusCard
                color="purple"
                icon="paid"
                title="Null"
                amount="Null"
              />
              <StatusCard color="blue" icon="poll" title="Null" amount="Null" />
            </div>
          </div>
        </div>

        <div className="px-3 md:px-8 h-auto">
          <div className="container mx-auto max-w-full">
            <div className="grid grid-cols-1 xl:grid-cols-5">
              <div className="xl:col-start-1 xl:col-end-6 px-4 mb-14">
                <PageVisitsCard box={box} setBox={setBox} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
