// src/components/dashboard/ActivityFeed.jsx
import React from "react";
import styles from "./dashboard.module.css";

const ActivityFeed = ({ activities = [] }) => {
  return (
    <div className={styles.activityCard}>
      <h3 className={styles.sectionTitle}>Recent Activity Feed</h3>

      <div className={styles.activityList}>
        {activities.length === 0 ? (
          <p className={styles.emptyText}>No recent activity</p>
        ) : (
          activities.slice(0, 7).map((a, i) => (
            <p key={i} className={styles.activityItem}>
              • {a.message || a}
            </p>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;
