"use client"; // Required for Chart.js
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import styles from "@/app/dashboard/_components/_dashboardPageComponents/dashboardComponents.module.css";
import { useEffect, useState } from "react";
import getFormsByUserId from "@/services/getFormsByUserId";
import { toast } from "react-toastify";
import convertDateFromSeconds from "@/services/convertDateFromSeconds";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ResponseChart() {
  const [formsData, setFormsData] = useState([]);
  useEffect(() => {
    async function getData() {
      const userId = JSON.parse(sessionStorage.getItem("userInfo"))?.uid;
      try {
        const data = await getFormsByUserId(userId);
        if (data.length > 10) {
          data.length = 10;
        }
        setFormsData(data);
      } catch (error) {
        toast.error(error);
      }
    }
    getData();
  }, []);

  const formsTitle = formsData.map((e) => {
    return e.title;
  });

  const formsResponses = formsData.map((e) => {
    return Number(e.attributes.submissions?.length || 0);
  });

  const formsDate = formsData.map((e) => {
    return convertDateFromSeconds(e.createdAt.seconds);
  });
  function peakDay(formsData) {
    const dayCounts = {};

    formsData?.forEach((form) => {
      form.attributes?.submissions?.forEach((submission) => {
        const submissionDate = submission?.submittedAt.split("T")[0];
        dayCounts[submissionDate] = (dayCounts[submissionDate] || 0) + 1;
      });
    });

    let peakDay = null;
    let maxSubmissions = 0;

    for (const [date, count] of Object.entries(dayCounts)) {
      if (count > maxSubmissions) {
        maxSubmissions = count;
        peakDay = date;
      }
    }

    return peakDay ? { date: peakDay, count: maxSubmissions } : null;
  }

  ////////////////////////////////
  const formData = {
    labels: [...formsTitle],
    responses: [...formsResponses],
    dates: [...formsDate],
  };
  const totalResponses = formData.responses.reduce((a, b) => a + b, 0);

  const data = {
    labels: formData.dates,
    datasets: [
      {
        label: "Responses",
        data: formData.responses,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.3,
        fill: true,
        pointBackgroundColor: "#3b82f6",
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 12,
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          title: (context) => formData.labels[context[0].dataIndex],
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawOnChartArea: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className={styles.chartContainer}>
      <h3>
        <i className="fas fa-chart-line"></i> Response Trends (Last{" "}
        {formData.labels.length} Forms)
      </h3>
      <div className={styles.chartWrapper}>
        <Line data={data} options={options} />
      </div>
      <div className={styles.statsSummary}>
        <div>
          <span>Total Responses</span>
          <strong>{formData.responses.reduce((a, b) => a + b, 0)}</strong>
        </div>
        <div>
          <span>Avg. per Form</span>
          <strong>
            {Number(
              Math.round(
                formData.responses.length > 0
                  ? Math.round(totalResponses / formData.responses.length)
                  : 0
              )
            )}
          </strong>
        </div>
        <div>
          <span>Peak Day</span>
          <strong>
            {Math.max(...formData.responses) || ""} (
            {peakDay(formsData)?.date || 0})
          </strong>
        </div>
      </div>
    </div>
  );
}
