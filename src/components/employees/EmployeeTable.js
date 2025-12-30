import React from "react";
import EmployeeRow from "./EmployeeRow";
import styles from "./employees.module.css";

const EmployeeTable = ({
  employees = [],
  selected = [],
  setSelected,
  onEdit,
  onDelete,
}) => {
  const toggleAll = () => {
    if (employees.length === 0) return;

    if (selected.length === employees.length) {
      setSelected([]);
    } else {
      setSelected(employees.map((e) => e._id));
    }
  };

  return (
    <div className={styles.card}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={
                    employees.length > 0 &&
                    selected.length === employees.length
                  }
                  onChange={toggleAll}
                />
                <span className={styles.checkmark}></span>
              </label>
            </th>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Assigned Leads</th>
            <th>Closed Leads</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="7" className={styles.empty}>
                No employees found
              </td>
            </tr>
          ) : (
            employees.map((emp) => (
              <EmployeeRow
                key={emp._id}
                emp={emp}
                selected={selected}
                setSelected={setSelected}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
