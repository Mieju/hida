import React from "react";

const states = [
  { id: "SH", name: "Schleswig-Holstein", x: 80, y: 10 },
  { id: "HH", name: "Hamburg", x: 120, y: 20 },
  { id: "MV", name: "Mecklenburg-Vorpommern", x: 150, y: 30 },
  { id: "NI", name: "Lower Saxony", x: 80, y: 60 },
  { id: "HB", name: "Bremen", x: 110, y: 70 },
  { id: "BE", name: "Berlin", x: 170, y: 70 },
  { id: "BB", name: "Brandenburg", x: 180, y: 90 },
  { id: "NW", name: "North Rhine-Westphalia", x: 60, y: 100 },
  { id: "HE", name: "Hesse", x: 100, y: 120 },
  { id: "TH", name: "Thuringia", x: 150, y: 120 },
  { id: "SN", name: "Saxony", x: 190, y: 140 },
  { id: "SA", name: "Saxony-Anhalt", x: 140, y: 100 },
  { id: "RP", name: "Rhineland-Palatinate", x: 80, y: 140 },
  { id: "BW", name: "Baden-Wuerttemberg", x: 90, y: 180 },
  { id: "BY", name: "Bavaria", x: 150, y: 180 },
  { id: "SL", name: "Saarland", x: 50, y: 170 },
];

function GermanyMap({ selected, onSelect }) {
  return (
    <svg viewBox="0 0 250 230" className="w-full h-full">
      {states.map((s) => (
        <rect
          key={s.id}
          x={s.x}
          y={s.y}
          width="40"
          height="30"
          fill={selected === s.name ? "orange" : "#ddd"}
          stroke="#333"
          onClick={() => onSelect(s.name)}
        >
          <title>{s.name}</title>
        </rect>
      ))}
    </svg>
  );
}

export default GermanyMap;
