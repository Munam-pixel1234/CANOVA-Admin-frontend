import React, { useEffect, useState } from "react";
import Sidebar from "../../components/common/Sidebar/Sidebar";
import Header from "../../components/common/Header/Header";

import KpiCard from "../../components/dashboard/KpiCard";
import SalesChart from "../../components/dashboard/SalesChart";
import ActivityFeed from "../../components/dashboard/ActivityFeed";
import ActiveSalesList from "../../components/dashboard/ActiveSalesList";

import { getDashboardData } from "../../api/dashboard.api";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [data, setData] = useState({
    unassignedLeads: 0,
    assignedThisWeek: 0,
    activeSalesPeople: 0,
    conversionRate: 0,
    activities: [],
    activeEmployees: [],
    conversionTrend: [],
  });

  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboardData();

      setData({
        unassignedLeads: res?.unassignedLeads ?? 0,
        assignedThisWeek: res?.assignedThisWeek ?? 0,
        activeSalesPeople: res?.activeSalesPeople ?? 0,
        conversionRate: res?.conversionRate ?? 0,

        activities: Array.isArray(res?.recentActivities)
          ? res.recentActivities
          : [],

        activeEmployees: Array.isArray(res?.activeEmployees)
          ? res.activeEmployees
          : [],

        conversionTrend: Array.isArray(res?.conversionTrend)
          ? res.conversionTrend
          : [],
      });
    } catch (err) {
      console.error("Dashboard API error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();

    // ✅ REAL-TIME REFRESH (every 10 seconds)
    const interval = setInterval(() => {
      fetchDashboard();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading dashboard…</div>;
  }

  return (
    <div className={styles.wrapper}>
      <Sidebar />

      <div className={styles.main}>
        <Header />

        <div className={styles.content}>
          <p className={styles.breadcrumb}>Home &gt; Dashboard</p>

          {/* KPI CARDS */}
          <div className={styles.kpiRow}>
            <KpiCard
              title={
                <span className={styles.kpiTitle}>
                  <img src="/assets/icons/dash1.png" alt="" />
                  Unassigned Leads
                </span>
              }
              value={data.unassignedLeads}
            />

            <KpiCard
              title={
                <span className={styles.kpiTitle}>
                  <img src="/assets/icons/dash2.png" alt="" />
                  Assigned This Week
                </span>
              }
              value={data.assignedThisWeek}
            />

            <KpiCard
              title={
                <span className={styles.kpiTitle}>
                  <img src="/assets/icons/dash3.png" alt="" />
                  Active Sales People
                </span>
              }
              value={data.activeSalesPeople}
            />

            <KpiCard
              title={
                <span className={styles.kpiTitle}>
                  <img src="/assets/icons/dash4.png" alt="" />
                  Conversion Rate
                </span>
              }
              value={`${data.conversionRate}%`}
            />
          </div>

          {/* CHART + ACTIVITY */}
          <div className={styles.middleRow}>
            <div className={styles.analyticsBox}>
              <h3 className={styles.sectionTitle}>Sale Analytics</h3>
              <SalesChart conversionTrend={data.conversionTrend} />
            </div>

            <ActivityFeed activities={data.activities} />
          </div>

          {/* ACTIVE SALES PEOPLE */}
          <ActiveSalesList employees={data.activeEmployees} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
