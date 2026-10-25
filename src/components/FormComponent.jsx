import React, { useState } from 'react';

// Simple lead‑generation form – mobile‑first layout
export default function FormComponent({ onEnroll }) {
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    course: '',
    branch: 'Tirupati',
    mode: 'offline',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onEnroll) onEnroll(form.course || 'AP DSC 2026 (SGT Batch)');
    // The parent component (App) already handles the actual submission logic.
  };

  return (
    <form className="form-component" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-2">Reserve Your Seat</h2>
      <input
        className="input-field"
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        className="input-field"
        name="mobile"
        placeholder="Mobile Number"
        type="tel"
        value={form.mobile}
        onChange={handleChange}
        required
      />
      <select
        className="input-field"
        name="course"
        value={form.course}
        onChange={handleChange}
        required
      >
        <option value="">Select Course</option>
        {/* Default options – can be replaced with dynamic data */}
        <option value="AP DSC 2026 (SGT Batch)">AP DSC 2026 (SGT Batch)</option>
        <option value="AP DSC 2026 (School Assistant)">AP DSC 2026 (School Assistant)</option>
        <option value="Teacher Eligibility Test (TET)">Teacher Eligibility Test (TET)</option>
        <option value="SI Programs">SI Programs</option>
        <option value="Constable Programs">Constable Programs</option>
        <option value="Banking, SSC & Railway">Banking, SSC & Railway</option>
      </select>
      <button type="submit" className="submit-btn">
        Enroll Now
      </button>
    </form>
  );
}
