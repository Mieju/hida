import { useEffect, useState } from "react";
import BarChart from "./BarChart";
import GermanyMap from "./GermanyMap";

function App() {
  const [results, setResults] = useState([]);
  const [stateResults, setStateResults] = useState({});
  const [selectedState, setSelectedState] = useState("Bavaria");

  useEffect(() => {
    fetch("http://localhost:3001/api/results")
      .then((res) => res.json())
      .then((data) => setResults(data));

    fetch("http://localhost:3001/api/state-results")
      .then((res) => res.json())
      .then((data) => setStateResults(data));
  }, []);

  const stateData = stateResults[selectedState] || [];

  return (
    <div className="p-4 h-screen flex flex-col">
      <h1 className="text-2xl font-bold text-center mb-4">
        German Federal Election Results 2025
      </h1>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/4 p-2 overflow-y-auto">
          <h2 className="font-semibold mb-2 text-center">Nationwide</h2>
          <BarChart data={results} />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-72 h-72">
            <GermanyMap selected={selectedState} onSelect={setSelectedState} />
          </div>
        </div>
        <div className="w-1/4 p-2 overflow-y-auto">
          <h2 className="font-semibold mb-2 text-center">{selectedState}</h2>
          <BarChart data={stateData} alignRight />
        </div>
      </div>
    </div>
  );
}

export default App;
