import React, { useState } from "react";
import { createLead } from "../../api/leads.api";
import styles from "./leads.module.css";

const LeadModal = ({ onClose }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    source: "",
    date: "",
    location: "",
    language: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.language) {
      alert("Name, Email and Language are required");
      return;
    }

    try {
      await createLead(form);
      alert("Lead created successfully");
      onClose();
    } catch (err) {
      alert("Failed to create lead");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3>Add New Lead</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <form onSubmit={submit} className={styles.modalForm}>
          <label>Name</label>
          <input
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <label>Email</label>
          <input
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <label>Source</label>
          <input
            value={form.source}
            onChange={(e) =>
              setForm({ ...form, source: e.target.value })
            }
          />

          <label>Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
          />

          <label>Location</label>
          <input
            value={form.location}
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
          />

          <label>Preferred Language</label>
          <input
            value={form.language}
            onChange={(e) =>
              setForm({ ...form, language: e.target.value })
            }
          />

          <button className={styles.saveBtn}>Save</button>
        </form>
      </div>
    </div>
  );
};

export default LeadModal;
