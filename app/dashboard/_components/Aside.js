"use client";
import Link from "next/link";
import styles from "@/app/dashboard/dashboard.module.css";
import { useParams, usePathname } from "next/navigation";

const Aside = () => {
  const pathname = usePathname();
  const params = useParams();
  console.log();

  return (
    <>
      <aside className={styles.aside}>
        <nav className={styles.nav_links}>
          <Link
            href="/dashboard"
            style={
              pathname === "/dashboard" ? { backgroundColor: "#F5F6F7" } : null
            }
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/profile"
            style={
              pathname === "/dashboard/profile"
                ? { backgroundColor: "#F5F6F7" }
                : null
            }
          >
            Profile
          </Link>
          <Link
            href="/dashboard/forms"
            style={
              pathname === "/dashboard/forms" ||
              pathname === `/dashboard/forms/display/${params.formId}`
                ? { backgroundColor: "#F5F6F7" }
                : null
            }
          >
            Forms
          </Link>
          <Link
            href="/dashboard/forms/create"
            style={
              pathname === "/dashboard/forms/create"
                ? { backgroundColor: "#F5F6F7" }
                : null
            }
          >
            Create Form
          </Link>
          <Link
            href="/dashboard/forms/forms-responses"
            style={
              pathname === "/dashboard/forms/forms-responses" ||
              pathname === `/dashboard/forms/forms-responses/${params.formId}`
                ? { backgroundColor: "#F5F6F7" }
                : null
            }
          >
            Form Responses
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Aside;
