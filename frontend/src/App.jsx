import { useEffect, useState } from "react";

function App() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/results")
      .then((res) => res.json())
      .then((data) => setResults(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        German Federal Election Results 2025
      </h1>
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2">Party</th>
            <th className="px-4 py-2">Vote %</th>
            <th className="px-4 py-2">Seats</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, i) => (
            <tr key={i} className="border-b">
              <td className="px-4 py-2">{r.party}</td>
              <td className="px-4 py-2">{r.votes}</td>
              <td className="px-4 py-2">{r.seats}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
