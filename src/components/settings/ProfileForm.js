// src/components/settings/ProfileForm.jsx
import React, { useEffect, useState } from "react";
import { getAdminProfile, updateAdminProfile } from "../../api/settings.api";
import styles from "./ProfileForm.module.css";

const ProfileForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);

  /* ================= LOAD ADMIN PROFILE ================= */
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const admin = await getAdminProfile();

        if (admin?.name) {
          const parts = admin.name.split(" ");
          setFirstName(parts[0] || "");
          setLastName(parts.slice(1).join(" ") || "");
        }

        setEmail(admin.email || "");
      } catch (err) {
        alert("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  /* ================= SUBMIT ================= */
  const submit = async (e) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const payload = {
      name: `${firstName} ${lastName}`.trim(),
    };

    // only send password if user typed it
    if (password) {
      payload.password = password;
    }

    try {
      await updateAdminProfile(payload);
      alert("Profile updated successfully");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      alert("Update failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form className={styles.form} onSubmit={submit}>
      {/* TITLE */}
      <p className={styles.title}>Edit Profile</p>
      <div className={styles.titleLine} />

      {/* FIRST NAME */}
      <label className={styles.label}>First name</label>
      <input
        className={styles.input}
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      {/* LAST NAME */}
      <label className={styles.label}>Last name</label>
      <input
        className={styles.input}
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      {/* EMAIL */}
      <label className={styles.label}>Email</label>
      <input className={styles.input} value={email} disabled />

      {/* PASSWORD */}
      <label className={styles.label}>Password</label>
      <input
        className={styles.input}
        type="password"
        placeholder="********"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* CONFIRM PASSWORD */}
      <label className={styles.label}>Confirm Password</label>
      <input
        className={styles.input}
        type="password"
        placeholder="********"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {/* SAVE BUTTON */}
      <div className={styles.actions}>
        <button type="submit" className={styles.saveBtn}>
          Save
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
