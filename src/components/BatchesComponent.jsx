import React from 'react';
import batchesData from "../data/batches.json";

export default function BatchesComponent() {
  const { currentRunning, upcoming15DaysDSC } = batchesData;
  return (
    <section className="batches-component max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-4">Current Running Batches</h2>
      <ul className="list-disc list-inside mb-6">
        {currentRunning && currentRunning.map((b, i) => (
          <li key={i}>{b.title} – {b.timing}</li>
        ))}
      </ul>
      <h3 className="text-xl font-semibold mb-2">Upcoming DSC Batches (Next 15 Days)</h3>
      <ul className="list-disc list-inside">
        {upcoming15DaysDSC && upcoming15DaysDSC.map((b, i) => (
          <li key={i}>{b.title} – {b.timing}</li>
        ))}
      </ul>
    </section>
  );
}
