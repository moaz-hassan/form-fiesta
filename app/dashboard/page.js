import { Suspense } from "react";
import FormResponsesChart from "./_components/_dashboardPageComponents/FormResponsesChart";
import Spinner from "../_components/Spinner";
import RecentForms from "@/app/dashboard/_components/_dashboardPageComponents/RecentForms";
import RecentResponses from "@/app/dashboard/_components/_dashboardPageComponents/RecentResponses";
import styles from "./dashboard.module.css";
import UserFormsPerformance from "./_components/_dashboardPageComponents/userFormsPerformance";

export default function DashboardHome() {
  return (
    <>
      <UserFormsPerformance />
      <FormResponsesChart />
      <Suspense fallback={<Spinner size="large" />}>
        <div className={styles.recent_activity}>
          <RecentForms />
          <RecentResponses />
        </div>
      </Suspense>
    </>
  );
}
