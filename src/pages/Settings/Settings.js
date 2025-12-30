import React from "react";
import Sidebar from "../../components/common/Sidebar/Sidebar";
import ProfileForm from "../../components/settings/ProfileForm";
import styles from "./Settings.module.css";

const Settings = () => {
  return (
    <div className={styles.wrapper}>
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className={styles.main}>
       
        {/* Top Divider */}
        <div className={styles.divider} />

        {/* Breadcrumb */}
        <p className={styles.breadcrumb}>Home &gt; Settings</p>

        {/* Settings Card */}
        <div className={styles.card}>
          <ProfileForm />
        </div>
      </div>
    </div>
  );
};

export default Settings;
