"use client";
import { useState, useEffect } from "react";
import { createStudyPlan } from "@/services/api";

import {useRouter}  from "next/navigation";
const router =useRouter();
export default function DashboardPage() {
  // form state
  const [subject, setSubject] = useState("");
  const [examDate, setExamDate] = useState("");
const [studyPlan, setStudyPlan] = useState<any[]>([]);
const [isLoading, setIsLoading] = useState(false);
const [errorMessage, setErrorMessage] = useState("");

  const [token, setToken] = useState("");
  const [studyPlan, setStudyPlan] = useState<any[]>([]);
  useEffect(() => {
    const t = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";
    setToken(t);
  }, []);

  async function handleGeneratePlan() {
    if (!token) {
      alert("Please log in to generate a study plan.");
      return;
    }
    try {
      await createStudyPlan(
        {
          subject,
          examDate,
        },
        token
      );

 alert("Study plan generated!");
    } catch (error) {
      alert("Error generating study plan");
    }
  }

       return (
    <div style={{ padding: "40px" }}>
      <h1>Generate Study Plan</h1>

      <input
        type="text"
        placeholder="Subject (e.g. DSA)"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <br /><br />

      <input
        type="date"
        value={examDate}
        onChange={(e) => setExamDate(e.target.value)}
      />

      <br /><br />

      <button onClick={handleGeneratePlan}>
        Generate Plan
      </button>
    </div>
  );
}