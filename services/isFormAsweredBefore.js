"use client";
export default function isFormAnsweredBefore() {
  if (localStorage.getItem("isFormAnsweredBefore") === null) {
    localStorage.setItem("isFormAnsweredBefore", false);
  }
  return localStorage.getItem("isFormAnsweredBefore");
}
