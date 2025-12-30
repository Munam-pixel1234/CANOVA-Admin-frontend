import React, { useEffect, useState } from "react";

import Sidebar from "../../components/common/Sidebar/Sidebar";
import Header from "../../components/common/Header/Header";

import EmployeeTable from "../../components/employees/EmployeeTable";
import EmployeeForm from "../../components/employees/EmployeeForm";
import BulkDeleteBar from "../../components/employees/BulkDeleteBar";

import {
  getEmployees,
  createEmployee,
  deleteEmployees,
} from "../../api/employees.api";

import styles from "./Employees.module.css";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ USED
  const [showForm, setShowForm] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  /* ================= FETCH ================= */
  const fetchEmployees = async (pageNo = 1) => {
    try {
      setLoading(true);
      const res = await getEmployees(pageNo);

      setEmployees(Array.isArray(res?.employees) ? res.employees : []);
      setTotalPages(res?.totalPages || 1);
    } catch (err) {
      console.error("Fetch employees error:", err);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees(page);
  }, [page]);

  /* ================= CREATE ================= */
  const handleCreate = async (form) => {
    await createEmployee(form);
    setShowForm(false);
    setPage(1);
    fetchEmployees(1);
  };

  /* ================= DELETE ================= */
  const handleDeleteSingle = async (id) => {
    await deleteEmployees([id]);
    fetchEmployees(page);
  };

  const handleBulkDelete = async () => {
    await deleteEmployees(selected);
    setSelected([]);
    fetchEmployees(page);
  };

  const handleEdit = (emp) => {
    console.log("Edit:", emp);
  };

  return (
    <div className={styles.wrapper}>
      <Sidebar />

      <div className={styles.main}>
        <Header />

        <div className={styles.content}>
          <div className={styles.topBar}>
            <p className={styles.breadcrumb}>Home &gt; Employees</p>
            <button
              className={styles.addBtn}
              onClick={() => setShowForm(true)}
            >
              Add Employees
            </button>
          </div>

          {showForm && (
            <EmployeeForm
              onCreate={handleCreate}
              onClose={() => setShowForm(false)}
            />
          )}

          {selected.length > 0 && (
            <BulkDeleteBar
              count={selected.length}
              onDelete={handleBulkDelete}
            />
          )}

          {/* ✅ LOADING USED HERE */}
          <div className={styles.card}>
            {loading ? (
              <p>Loading employees…</p>
            ) : (
              <EmployeeTable
                employees={employees}
                selected={selected}
                setSelected={setSelected}
                onEdit={handleEdit}
                onDelete={handleDeleteSingle}
              />
            )}
          </div>

          <div className={styles.pagination}>
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              ← Previous
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;
