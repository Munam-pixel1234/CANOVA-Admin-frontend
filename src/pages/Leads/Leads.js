import React, { useEffect, useState } from "react";
import Sidebar from "../../components/common/Sidebar/Sidebar";
import Header from "../../components/common/Header/Header";
import LeadModal from "../../components/leads/LeadModal";
import CsvModal from "../../components/leads/CsvModal";
import { getLeads } from "../../api/leads.api";
import styles from "./Leads.module.css";

const ITEMS_PER_PAGE = 4;

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showCsvModal, setShowCsvModal] = useState(false);

  const loadLeads = async () => {
    try {
      const data = await getLeads();
      setLeads(Array.isArray(data) ? data : []);
      setCurrentPage(1);
    } catch (err) {
      console.error("Failed to load leads", err);
      setLeads([]);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString() : "-";

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(leads.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedLeads = leads.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const goPrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className={styles.wrapper}>
      <Sidebar />

      <div className={styles.main}>
        <Header />

        {/* TOP BAR */}
        <div className={styles.topRow}>
          <p className={styles.breadcrumb}>Home &gt; Leads</p>

          <div className={styles.actions}>
            <button
              className={styles.actionBtn}
              onClick={() => setShowLeadModal(true)}
            >
              Add Manually
            </button>

            <button
              className={styles.actionBtn}
              onClick={() => setShowCsvModal(true)}
            >
              Add CSV
            </button>
          </div>
        </div>

        {/* TABLE CONTAINER */}
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <span>No.</span>
            <span>Name</span>
            <span>Email</span>
            <span>Source</span>
            <span>Date</span>
            <span>Location</span>
            <span>Language</span>
            <span>Assigned To</span>
            <span>Status</span>
            <span>Type</span>
            <span>Scheduled Date</span>
          </div>

          {paginatedLeads.length === 0 ? (
            <p className={styles.empty}>No leads found</p>
          ) : (
            paginatedLeads.map((lead, index) => (
              <div key={lead._id} className={styles.tableRow}>
                <span>{startIndex + index + 1}</span>
                <span>{lead.name}</span>
                <span>{lead.email}</span>
                <span>{lead.source}</span>
                <span>{formatDate(lead.date)}</span>
                <span>{lead.location}</span>
                <span>{lead.language}</span>
                <span>
                  {lead.assignedTo?.name
                    ? `${lead.assignedTo.name} (${lead.assignedTo.employeeId})`
                    : "-"}
                </span>
                <span>{lead.status}</span>
                <span>{lead.type || "-"}</span>
                <span>{formatDate(lead.scheduledDate)}</span>
              </div>
            ))
          )}
        </div>

        {/* ✅ PAGINATION FOOTER (OUTSIDE CONTAINER) */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles.pageBtn}
              onClick={goPrev}
              disabled={currentPage === 1}
            >
              ← Previous
            </button>

            <div className={styles.pageNumbers}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <span
                    key={page}
                    className={
                      page === currentPage ? styles.activePage : ""
                    }
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </span>
                )
              )}
            </div>

            <button
              className={styles.pageBtn}
              onClick={goNext}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {/* MODALS */}
      {showLeadModal && (
        <LeadModal
          onClose={() => {
            setShowLeadModal(false);
            loadLeads();
          }}
        />
      )}

      {showCsvModal && (
        <CsvModal
          onClose={() => {
            setShowCsvModal(false);
            loadLeads();
          }}
        />
      )}
    </div>
  );
};

export default Leads;
