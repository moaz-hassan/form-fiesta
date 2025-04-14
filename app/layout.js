import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";
import { ToastContainer } from "react-toastify";
export const metadata = {
  title: "Form Builder",
  description:
    "Create custom forms effortlessly with our intuitive form builder app. Build, design, and deploy personalized forms for any purpose, all with a user-friendly interface and powerful backend support.",
};

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        />
      </head>
      <body className={roboto.className}>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
