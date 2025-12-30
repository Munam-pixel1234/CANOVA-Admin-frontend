import React, { useRef, useState } from "react";
import { uploadLeadsCSV } from "../../api/leads.api";
import styles from "./csvModal.module.css";

const CsvModal = ({ onClose }) => {
  const fileRef = useRef();
  const [file, setFile] = useState(null);
  const [stage, setStage] = useState("select");

  const handleBrowse = () => {
    fileRef.current.click();
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const submit = async () => {
    if (!file) {
      alert("Please select a CSV file");
      return;
    }

    try {
      setStage("uploading");
      await uploadLeadsCSV(file);
      onClose(); // parent refreshes leads
    } catch (err) {
      alert("CSV upload failed");
      setStage("select");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div>
            <h3>CSV Upload</h3>
            <p>Add your documents here</p>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {stage === "select" && (
          <div className={styles.dropBox}>
            <p>Upload CSV file</p>

            <button className={styles.browseBtn} onClick={handleBrowse}>
              Browse files
            </button>

            <input
              type="file"
              ref={fileRef}
              hidden
              accept=".csv"
              onChange={handleFileChange}
            />
          </div>
        )}

        {stage === "uploading" && (
          <div className={styles.dropBox}>
            <p>Uploading…</p>
          </div>
        )}

        {stage === "select" && (
          <div className={styles.footer}>
            <button className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button className={styles.nextBtn} onClick={submit}>
              Upload
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CsvModal;

