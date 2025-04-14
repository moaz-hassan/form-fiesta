"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import Navbar from "@/app/dashboard/_components/Navbar";
import styles from "@/app/dashboard/dashboard.module.css";

// Dynamically import components
const Aside = dynamic(() => import("./_components/Aside"), { ssr: false });
const Spinner = dynamic(() => import("@/app/_components/Spinner"), {
  ssr: false,
});

export default function RootLayout({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = () => {
      try {
        const userInfo = localStorage.getItem("userInfo");

        if (!userInfo) {
          throw new Error("User not authenticated");
        }
        setIsAuthenticated(true);
      } catch (error) {
        toast.error("You need to login to access this page");
        setIsAuthenticated(false);
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, [router]);

  if (isLoading) {
    return (
      <div className={styles.fullPageLoader}>
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <Aside />
        <div className={styles.content_div}>
          <Suspense fallback={<Spinner size="large"/>}>{children}</Suspense>
        </div>
      </div>
    </>
  );
}
