import React from "react";

function BarChart({ data, alignRight = false }) {
  return (
    <div className="space-y-1">
      {data.map((r, i) => (
        <div
          key={i}
          className={`flex items-center ${alignRight ? "flex-row-reverse" : ""}`}
        >
          <span className="w-32 text-sm truncate">{r.party}</span>
          <div className="flex-1 h-4 bg-gray-200 mx-2 relative overflow-hidden">
            <div
              className="h-4 bg-blue-500"
              style={{ width: `${r.votes}%` }}
            />
          </div>
          <span className="w-12 text-sm text-right">{r.votes}%</span>
        </div>
      ))}
    </div>
  );
}

export default BarChart;
