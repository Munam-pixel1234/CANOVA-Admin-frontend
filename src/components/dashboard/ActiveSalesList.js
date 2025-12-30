// src/components/dashboard/ActiveSalesList.jsx
import React from "react";
import styles from "./dashboard.module.css";

const ActiveSalesList = ({ employees = [] }) => {
  return (
    <div className={styles.salesList}>
      

      {employees.length === 0 ? (
        <p className={styles.emptyText}>No active sales people</p>
      ) : (
        <div className={styles.salesTableWrapper}>
          <table className={styles.salesTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Employee ID</th>
                <th>Assigned</th>
                <th>Closed</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((e) => (
                <tr key={e._id}>
                  <td>{e.name}</td>
                  <td>{e.employeeId}</td>
                  <td>{e.assignedLeads ?? 0}</td>
                  <td>{e.closedLeads ?? 0}</td>
                  <td>
                    <span
                      className={
                        e.status === "Active"
                          ? styles.activeStatus
                          : styles.inactiveStatus
                      }
                    >
                      ● {e.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ActiveSalesList;
