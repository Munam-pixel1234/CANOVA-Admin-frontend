import React, { useState, useEffect } from "react";
import styles from "./employees.module.css";

const EmployeeForm = ({ initialData, onCreate, onUpdate, onClose }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    language: "",
  });

  useEffect(() => {
    if (initialData) {
      const [firstName, ...rest] = initialData.name.split(" ");
      setForm({
        firstName,
        lastName: rest.join(" "),
        email: initialData.email || "",
        location: initialData.location || "",
        language: initialData.language || "",
      });
    }
  }, [initialData]);

  const submit = (e) => {
    e.preventDefault();

    const payload = {
      name: `${form.firstName} ${form.lastName}`.trim(),
      email: form.email,
      location: form.location,
      language: form.language,
    };

    initialData ? onUpdate(payload) : onCreate(payload);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        {/* HEADER */}
        <div className={styles.modalHeader}>
          <h3>Add Employee</h3>
          <button onClick={onClose}>✕</button>
        </div>

        {/* FORM */}
        <form className={styles.form} onSubmit={submit}>
          {/* FIRST NAME */}
          <div className={styles.fieldGroup}>
            <label>First Name</label>
            <input
              className={styles.input}
              value={form.firstName}
              onChange={(e) =>
                setForm({ ...form, firstName: e.target.value })
              }
              required
            />
          </div>

          {/* LAST NAME */}
          <div className={styles.fieldGroup}>
            <label>Last Name</label>
            <input
              className={styles.input}
              value={form.lastName}
              onChange={(e) =>
                setForm({ ...form, lastName: e.target.value })
              }
            />
          </div>

          {/* EMAIL */}
          <div className={styles.fieldGroup}>
            <label>Email</label>
            <input
              type="email"
              className={styles.input}
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
            />
          </div>

          {/* LOCATION */}
          <div className={styles.fieldGroup}>
            <label>Location</label>
            <select
              className={`${styles.select} ${styles.dropdown}`}
              value={form.location}
              onChange={(e) =>
                setForm({ ...form, location: e.target.value })
              }
            >
              <option value="">Select</option>
              <option>Chennai</option>
              <option>Mumbai</option>
              <option>Bangalore</option>
            </select>
          </div>

          {/* LANGUAGE */}
          <div className={styles.fieldGroup}>
            <div className={styles.languageRow}>
              <label>Preferred Language</label>

              <div className={styles.tooltipWrapper}>
                <span className={styles.infoIcon}>i</span>
                <div className={styles.tooltip}>
                  Leads will be assigned based on language
                </div>
              </div>
            </div>

            <select
              className={`${styles.select} ${styles.dropdown}`}
              value={form.language}
              onChange={(e) =>
                setForm({ ...form, language: e.target.value })
              }
              required
            >
              <option value="">Select</option>
              <option>Kannada</option>
              <option>Marathi</option>
            </select>
          </div>

          {/* ACTION */}
          <div className={styles.actions}>
            <button type="submit" className={styles.saveBtn}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
