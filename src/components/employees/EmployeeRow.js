import React, { useState, useRef, useEffect } from "react";
import styles from "./employees.module.css";

const EmployeeRow = ({
  emp,
  selected = [],
  setSelected,
  onEdit,
  onDelete,
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  const checked = selected.includes(emp._id);

  const toggleCheck = () => {
    if (checked) {
      setSelected(selected.filter((id) => id !== emp._id));
    } else {
      setSelected([...selected, emp._id]);
    }
  };

  /* Close menu on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <tr className={checked ? styles.activeRow : ""}>
      {/* CHECKBOX */}
      <td>
        <label className={styles.checkbox}>
          <input type="checkbox" checked={checked} onChange={toggleCheck} />
          <span className={styles.checkmark}></span>
        </label>
      </td>

      {/* NAME */}
      <td>
        <div className={styles.nameCell}>
          <strong>{emp.name}</strong>
          <span className={styles.email}>{emp.email}</span>
        </div>
      </td>

      <td>{emp.employeeId}</td>
      <td>{emp.assignedLeads ?? 0}</td>
      <td>{emp.closedLeads ?? 0}</td>

      {/* STATUS */}
      <td>
        {emp.status === "Active" ? (
          <span className={styles.statusActive}>● Active</span>
        ) : (
          <span className={styles.statusInactive}>● Inactive</span>
        )}
      </td>

      {/* ACTION MENU */}
      <td className={styles.menuCell}>
        <button
          className={styles.kebab}
          onClick={() => setOpenMenu((p) => !p)}
        >
          ⋮
        </button>

        {openMenu && (
          <div className={styles.menu} ref={menuRef}>
            <button
              className={styles.menuItem}
              onClick={() => {
                setOpenMenu(false);
                onEdit && onEdit(emp);
              }}
            >
              <img src="/assets/icons/ee1.png" alt="Edit" />
              
            </button>

            <button
              className={styles.menuItem}
              onClick={() => {
                setOpenMenu(false);
                onDelete && onDelete(emp._id);
              }}
            >
              <img src="/assets/icons/ee2.png" alt="Delete" />
              
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default EmployeeRow;
