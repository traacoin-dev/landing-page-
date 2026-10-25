import React from 'react';
import coursesData from "../data/courses.json";

export default function CourseComponent() {
  return (
    <section className="course-component max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-4">Our Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coursesData.map((c) => (
          <div key={c.id} className="course-card border rounded-lg p-4 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">{c.title}</h3>
            <p className="text-sm text-gray-600 mb-1"><strong>Tag:</strong> {c.tag}</p>
            <p className="text-sm text-gray-600 mb-1"><strong>Timing:</strong> {c.timing}</p>
            <p className="text-sm text-gray-700 mb-2">{c.summary}</p>
            <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">{c.badge}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
